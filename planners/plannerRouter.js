const express = require("express");
const router = express.Router();
const Planner = require("./planners-helpers");
const restricted = require("../middleware/restricted");

router.get("/:id/events", restricted, (req, res) => {
  const id = req.params.id;
  Planner.get(id)
    .then(events => {
      res.status(200).json(events);
    })
    .catch(error => {
      res.status(500).json({ error: "Server could not get events from user" });
    });
});

router.post("/:id/events", restricted, (req, res) => {
  const id = req.params.id;
  let newEvent = req.body;
  newEvent.portfolio_id = 4;
  Planner.add(id, newEvent)
    .then(event => {
      res.status(200).json(event);
    })
    .catch(error => {
      res.status(500).json({ error: "Server could not get events from user" });
    });
});

module.exports = router;
