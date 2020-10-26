const functions = require("firebase-functions");
const app = require("express")();

const { getAllScreams, postScream } = require("./handlers/screams");
const { userSignUp, userLogin } = require("./handlers/users");
const  FBAuth  = require("./util/FBAuth");

app.get("/screams", getAllScreams);

app.post("/screams", FBAuth, postScream);

app.post("/signup", userSignUp);

app.post("/login", userLogin);

//Signup Route

exports.api = functions.https.onRequest(app);
