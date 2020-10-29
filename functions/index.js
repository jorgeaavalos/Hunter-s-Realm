const functions = require("firebase-functions");
const app = require("express")();
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
} = require("./handlers/users");

const FBAuth = require("./util/FBAuth");

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

exports.api = functions.https.onRequest(app);

exports.createNotificationOnLike = functions.firestore.document(`likes/{}`);
