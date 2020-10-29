const { admin, db } = require("../util/admin");
const firebaseConfig = require("../util/config");
const firebase = require("firebase");

firebase.initializeApp(firebaseConfig);

const {
  validateSignUp,
  validateLogin,
  reduceUserDetails,
} = require("../util/validators");

exports.userSignUp = (req, res) => {
  const blankAvatar = "blank-avatar.png";
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    userName: req.body.userName,
  };

  const { valid, errors } = validateSignUp(newUser);
  if (!valid) return res.status(400).json(errors);

  db.doc(`/users/ ${newUser.userName}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return res
          .status(400)
          .json({ userName: "This userName is already taken" });
      } else {
        return firebase
          .auth()
          .createUserWithEmailAndPassword(newUser.email, newUser.password);
      }
    })
    .then((data) => {
      let token;
      userUid = data.user.uid;
      return data.user.getIdToken();
    })
    .then((userToken) => {
      token = userToken;

      const userCredentials = {
        userName: newUser.userName,
        email: newUser.email,
        createdOn: new Date().toISOString(),
        imageUrl: `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/${blankAvatar}?alt=media`,
        userUid: userUid,
      };
      return db.doc(`/users/ ${newUser.userName}`).set(userCredentials);
    })
    .then(() => {
      return res.status(201).json({ token });
    })
    .catch((err) => {
      if (err.code === "auth/email-already-in-use") {
        res.status(400).json({ email: "Email is already in use." });
      } else {
        console.error(err);
        return res.status(500).json({ error: err.code });
      }
    });
};

exports.userLogin = (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
  };

  const { valid, errors } = validateLogin(user);
  if (!valid) return res.status(400).json(errors);

  firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then((data) => {
      return data.user.getIdToken();
    })
    .then((token) => {
      return res.json({ token });
    })
    .catch((err) => {
      console.error(err);
      if (err.code === "auth/wrong-password") {
        return res.status(403).json({ general: "Wrong Password" });
      } else {
        return res.status(500).json({ error: err.code });
      }
    });
};

exports.addUserDetails = (req, res) => {
  let userDetails = reduceUserDetails(req.body);
  db.doc(`/users/ ${req.user.userName}`)
    .update(userDetails)
    .then(() => {
      return res.json({ message: `Details added successffully` });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

exports.getAuthUser = (req, res) => {
  let userData = {};
  db.doc(`/users/ ${req.user.userName}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        userData.credentials = doc.data();
        return db
          .collection("likes")
          .where("userName", "==", req.user.userName)
          .get();
      }
    })
    .then((data) => {
      userData.likes = [];
      data.forEach((doc) => {
        userData.likes.push(doc.data());
      });
      return res.json(userData);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

exports.uploadImage = (req, res) => {
  BusBoy = require("busboy");
  const path = require("path");
  const os = require("os");
  const fs = require("fs");

  let imageFileName;
  let imageToBeUploaded = {};

  const busboy = new BusBoy({ headers: req.headers });
  let filePath;

  busboy.on("file", (fieldName, file, filename, encoding, mimetype) => {
    if (mimetype !== "image/jpeg" && mimetype !== "image/png") {
      return res.status(400).json({ Error: "Wrong Filetype submitted" });
    }
    const imageExtension = filename.split(".")[filename.split(".").length - 1];
    imageFileName = `${Math.round(
      Math.random() * 10000000000000000
    )}.${imageExtension}`;
    const filePath = path.join(os.tmpdir(), imageFileName);
    imageToBeUploaded = { filePath, mimetype };
    file.pipe(fs.createWriteStream(filePath));
  });

  busboy.on("finish", () => {
    admin
      .storage()
      .bucket()
      .upload(imageToBeUploaded.filePath, {
        resumable: false,
        metadata: {
          metadata: {
            contentType: imageToBeUploaded.mimetype,
          },
        },
      })
      .then(() => {
        const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/${imageFileName}?alt=media`;
        return db.doc(`/users/ ${req.user.userName}`).update({ imageUrl });
      })
      .then(() => {
        return res.json({ message: "Image has been uploaded sucessfully" });
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).json({ error: err.code });
      });
  });

  busboy.end(req.rawBody);
};
