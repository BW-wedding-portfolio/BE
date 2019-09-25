const express = require("express");
const router = express.Router();

const Planner = require("./planner-helpers");
const restricted = require("../middleware/restricted");

router.get("/", restricted, (req, res) => {
  console.log(req.decodedToken);
  const { id } = req.decodedToken;
  console.log("ID", id);
  Planner.getById(id)
    .then(planner => {
      res.status(200).json(planner);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: "Server could not get planner" });
    });
});

module.exports = router;
