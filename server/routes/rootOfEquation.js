// Import dependencies
const express = require("express");
const db = require("../config");

// Import middlewares
const auth = require("../middleware/auth");
const { admin, editor, viewer } = require("../middleware/roles");

// Dummy data

// Setup the router for express
const router = express.Router();

// *************************
// Set up the route handlers
// *************************

router.get("/", [auth, viewer], async (req, res) => {
  const snapshot = await db.collection("example").get();

  var data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  //console.log(snapshot);

  res.send({
    ok: true,
    result: data,
  });
});

// Export the router
module.exports = router;
