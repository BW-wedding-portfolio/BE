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

  Events.create(newEvent)retergreg
    .then(newEvent => {
      res.status(200).json(newEvent);
    })
    .catch(error => {
      res.status(500).json({ error: "Server could not post event" });
    });
});

router.put("/:id/events/:eid", (req, res) => {
  const { id } = req.params;
  let changes = req.body;
  planner_id = id;
  changes.planner_id = planner_id;
  const { eid } = req.params;

  Events.getEvent(eid)
    .then(event => {
      if (event) {
        Events.update(changes, eid).then(updatedEvent => {
          res.status(200).json(updatedEvent);
        });
      } else {
        res.status(400).json({ error: "Could not find event with given id" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "Failed to update event" });
    });
});

router.delete("/:id/events/:eid", (req, res) => {
  const { id } = req.params;
  const { eid } = req.params;

  let deleted = req.body;
  planner_id = id;
  deleted.planned_id = planner_id;

  Events.remove(eid)
    .then(deleted => {
      if (deleted) {
        res.status(200).json({ removed: deleted });
      } else {
        res.status(404).json({ error: "Could not find event with that id" });
      }
    })
    .catch(error => {
      res.status(500).json({ error: "Server could not delete event" });
    });
});

module.exports = router;
