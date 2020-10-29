const { document } = require("firebase-functions/lib/providers/firestore");
const { admin, db } = require("../util/admin");

exports.getAllScreams = (req, res) => {
  db.collection("screams")
    .orderBy("createdOn", "desc")
    .get()
    .then((data) => {
      let screams = [];
      data.forEach((doc) => {
        screams.push({
          screamId: doc.id,
          body: doc.data().body,
          userName: doc.data().userName,
          createdOn: doc.data().createdOn,
          commentCount: doc.data().commentCount,
          likeCount: doc.data().likeCount,
        });
      });
      return res.json(screams);
    })
    .catch((err) => console.error(err));
};

exports.postScream = (req, res) => {
  if (req.method !== "POST") {
    return res
      .status(400)
      .json({ error: `Client side Error method not supported` });
  }

  const newScream = {
    body: req.body.body,
    userName: req.user.userName,
    userImageUrl: req.user.imageUrl,
    createdOn: new Date().toISOString(),
    likeCount: 0,
    commentCount: 0,
  };
  db.collection("screams")
    .add(newScream)
    .then((doc) => {
      const resScream = newScream;
      resScream.screamId = doc.id;

      res.json(resScream);
    })
    .catch((err) => {
      res.status(500).json({ error: `Something went wrong` });
      console.error(err);
    });
};

exports.getScream = (req, res) => {
  let screamData = {};
  var screamId = req.params.screamId.trim();
  db.doc(`/screams/${screamId}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Scream not found" });
      }
      screamData = doc.data();

      screamData.screamId = doc.id;

      return db
        .collection("comments")
        .orderBy("createdOn", "desc")
        .where("screamId", "==", screamId)
        .get();
    })
    .then((data) => {
      screamData.comments = [];
      data.forEach((doc) => {
        screamData.comments.push(doc.data());
      });
      return res.json(screamData);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

exports.commentScream = (req, res) => {
  if (req.body.body.trim() === "") {
    return res.status(400).json({ error: "Comment must not be empty" });
  }
  console.log(req.user.imageUrl);

  const newComment = {
    body: req.body.body,
    createdOn: new Date().toISOString(),
    screamId: req.params.screamId,
    userName: req.user.userName,
    userImageUrl: req.user.imageUrl,
  };
  var screamId = req.params.screamId.trim();
  console.log(screamId);
  db.doc(`/screams/${screamId}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ Error: "The scream does not exist" });
      } else {
        return db.collection("comments").add(newComment);
      }
    })
    .then(() => {
      return res.json(newComment);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ Erro: err.code });
    });
};

exports.unlikeScream = (req, res) => {
  const likeDocument = db
    .collection("likes")
    .where("userName", "==", req.user.userName)
    .where("screamId", "==", req.params.screamId)
    .limit(1);
  const screamDocument = db.doc(`/screams/${req.params.screamId}`);
  let screamData;
  screamDocument
    .get()
    .then((doc) => {
      if (doc.exists) {
        screamData = doc.data();
        screamData.screamId = doc.id;
        return likeDocument.get();
      } else {
        return res.status(404).json({ error: "Scream not found" });
      }
    })
    .then((data) => {
      if (data.empty) {
        return res.status(400).json({ Error: "Scream already unliked" });
      } else {
        return db
          .doc(`likes/${data.docs[0].id}`)
          .delete()
          .then(() => {
            screamData.likeCount--;
            return screamDocument.update({ likeCount: screamData.likeCount });
          })
          .then(() => {
            res.json(screamData);
          });
      }
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ Error: err.code });
    });
};

exports.likeScream = (req, res) => {
  console.log(req.params.screamId);
  console.log(req.user.userName);
  const likeDocument = db
    .collection("likes")
    .where("userName", "==", req.user.userName)
    .where("screamId", "==", req.params.screamId)
    .limit(1);

  const screamDocument = db.doc(`/screams/${req.params.screamId}`);
  let screamData;
  screamDocument
    .get()
    .then((doc) => {
      if (doc.exists) {
        screamData = doc.data();
        screamData.screamId = doc.id;
        return likeDocument.get();
      } else {
        return res.status(404).json({ error: "Scream not found" });
      }
    })
    .then((data) => {
      if (data.empty) {
        return db
          .collection("likes")
          .add({
            screamId: req.params.screamId,
            userName: req.user.userName,
          })
          .then(() => {
            screamData.likeCount++;
            return screamDocument.update({ likeCount: screamData.likeCount });
          })
          .then(() => {
            return res.json(screamData);
          });
      } else {
        return res.status(400).json({ Error: "Scream already like" });
      }
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ Error: err.code });
    });
};

exports.deleteScream = (req, res) => {
  console.log("Hello");
  const screamDocument = db.doc(`/screams/${req.params.screamId}`);
  screamDocument
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ Error: "Scream not found" });
      } else {
        return screamDocument.delete();
      }
    })
    .then(() => {
      return res.json({ message: "Scream deleted Successfully" });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ Error: err.code });
    });
};
