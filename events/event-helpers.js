const db = require("../data/db-config");

module.exports = {
  get,
  getEvent,
  create
};

function get(id) {
  return db("events")
    .join("planners", "planners.id", "=", "events.planner_id")
    .select(
      "planners.id",
      "events.event_name",
      "events.event_description",
      "events.theme"
    )
    .where({ "planners.id": id });
}

function getEvent(id) {
  return db("events").where({ id });
}

function create(newEvent) {
  return db("events")
    .insert(newEvent, "id")
    .then(([id]) => {
      return getEvent(id);
    });
}
