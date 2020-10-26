const { fs } = require("../util/admin");
const firebaseConfig = require("../util/config");
const firebase = require("firebase");

firebase.initializeApp(firebaseConfig.firebaseConfig);

const { validateSignUp, validateLogin } = require("../util/validators");










exports.userSignUp = (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    userName: req.body.userName,
  };

  const { valid, errors } = validateSignUp(newUser);
  if (!valid) return res.status(400).json(errors);

  fs.doc(`/users/ ${newUser.userName}`)
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
        userUid: userUid,
      };
      return fs.doc(`/users/ ${newUser.userName}`).set(userCredentials);
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
