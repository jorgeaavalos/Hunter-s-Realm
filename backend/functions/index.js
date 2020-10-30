const functions = require("firebase-functions");
const app = require("express")();
const { db } = require("./util/admin");
const {
  getAllScreams,
  postScream,
  getScream,
  commentScream,
  likeScream,
  unlikeScream,
  deleteScream,
} = require("./handlers/screams");
const {
  userSignUp,
  userLogin,
  uploadImage,
  addUserDetails,
  getAuthUser,
  getUserDetails,
  markNotificationsRead,
} = require("./handlers/users");

const FBAuth = require("./util/FBAuth");
const { json } = require("express");

//Scream Post Routes
app.post("/scream", FBAuth, postScream);
app.get("/scream", getAllScreams);
app.get("/scream/:screamId/", getScream);
app.delete("/scream/:screamId/", FBAuth, deleteScream);
app.post("/scream/:screamId/comment", FBAuth, commentScream);
app.get("/scream/:screamId/like", FBAuth, likeScream);
app.get("/scream/:screamId/unlike", FBAuth, unlikeScream);

//User Information Routes
app.post("/signup", userSignUp);
app.post("/login", userLogin);
app.post("/user", FBAuth, addUserDetails);
app.get("/user", FBAuth, getAuthUser);
app.post("/user/image", FBAuth, uploadImage);
app.get("/user/:userName", getUserDetails);
app.post("/notifications", FBAuth, markNotificationsRead);

exports.api = functions.https.onRequest(app);

//Firebase Firestore Functions
exports.createNotificationOnLike = functions.firestore
  .document("likes/{id}")
  .onCreate((snapshot) => {
    return db
      .doc(`/screams/${snapshot.data().screamId}`)
      .get()
      .then((doc) => {
        if (doc.exists && doc.data().userName !== snapshot.data().userName) {
          return db
            .doc(`/notifications/${snapshot.id}`)
            .set({
              createdOn: new Date().toISOString(),
              recipient: doc.data().userName,
              sender: snapshot.data().userName,
              type: "like",
              read: "false",
              screamId: doc.id,
            })
            .catch((err) => {
              console.error(err);
            });
        }
      });
  });

exports.createNotificationOnComment = functions.firestore
  .document("comments/{id}")
  .onCreate((snapshot) => {
    return db
      .doc(`/screams/${snapshot.data().screamId.trim()}`)
      .get()
      .then((doc) => {
        if (doc.exists && doc.data().userName !== snapshot.data().userName) {
          return db.doc(`/notifications/${snapshot.id}`).set({
            createdOn: new Date().toISOString(),
            recipient: doc.data().userName,
            sender: snapshot.data().userName,
            type: "comment",
            read: "false",
            screamId: doc.id,
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  });

exports.deleteNotificationOnUnlike = functions.firestore
  .document("likes/{id}")
  .onDelete((snapshot) => {
    return db
      .doc(`/notifications/${snapshot.id}`)
      .delete()
      .catch((err) => {
        console.error(err);
        return;
      });
  });

exports.updateImageUrlonChange = functions.firestore
  .document("users/{userName}")
  .onUpdate((change) => {
    if (change.before.data().imageUrl !== change.after.data().imageUrl) {
      let batch = db.batch();
      return db
        .collection("screams")
        .where("userName", "==", change.before.data().userName)
        .get()
        .then((data) => {
          data.forEach((doc) => {
            const scream = db.doc(`/screams/${doc.id}`);
            batch.update(scream, { imageUrl: change.after.data().imageUrl });
          });

          return batch.commit();
        });
    } else {
      return true;
    }
  });

exports.onScreamDelete = functions.firestore
  .document("/screams/{screamId}")
  .onDelete((snpashot, context) => {
    const screamId = context.params.screamId;
    const batch = db.batch();
    return db
      .collection("comments")
      .where("screamId", "==", screamId)
      .get()
      .then((data) => {
        data.forEach((doc) => {
          batch.delete(db.doc(`/comments/${doc.id}`));
        });
        return db.collection("likes").where("screamId", "==", screamId).get();
      })
      .then((data) => {
        data.forEach((doc) => {
          batch.delete(db.doc(`/likes/${doc.id}`));
        });
        return db
          .collection("notifications")
          .where("screamId", "==", screamId)
          .get();
      })
      .then((data) => {
        data.forEach((doc) => {
          batch.delete(db.doc(`/notifications/${doc.id}`));
        });
        return batch.commit();
      })
      .catch((err) => {
        console.error(err);
      });
  });
