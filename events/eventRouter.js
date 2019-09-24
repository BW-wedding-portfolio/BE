const express = require("express");
const router = express.Router();
const Events = require("./event-helpers");

router.get("/:id/events", (req, res) => {
  const { id } = req.params;
  Events.get(id)
    .then(events => {
      if (events.length === 0) {
        res.status(400).json({ error: "That planner has no events" });
      } else {
        res.status(200).json(events);
      }
    })
    .catch(error => {
      res.status(500).json({ error: "Server could not get events" });
    });
});

router.post("/:id/events", (req, res) => {
  const { id } = req.params;
  let newEvent = req.body;
  planner_id = id;
  newEvent.planner_id = planner_id;

  Events.create(newEvent)
    .then(newEvent => {
      res.status(200).json(newEvent);
    })
    .catch({ error: "Sever could not create event" });
});

module.exports = router;
