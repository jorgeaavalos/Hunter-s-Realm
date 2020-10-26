const {fs} = require("../util/admin");

exports.getAllScreams = (req, res) => {
  fs.collection("screams")
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
    createdOn: new Date().toISOString(),
  };
  fs.collection("screams")
    .add(newScream)
    .then((doc) => {
      res.json({
        message: `Document ${doc.id} has been added to the firebase`,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: `Something went wrong` });
      console.error(err);
    });
};
