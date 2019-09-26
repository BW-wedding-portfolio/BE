const db = require("../data/db-config");

module.exports = {
  all,
  getById,
  get,
  getEvent,
  create,
  update,
  remove
};

function all() {
  return db("events");
}

function getById(id) {
  return db("events")
    .where({ id })
    .first();
}

function get(id) {
  return db("events")
    .join("planners", "planners.id", "=", "events.planner_id")
    .select(
      "events.id as event_id",
      "planners.id as planner_id",
      "events.event_name",
      "events.event_description",
      "events.theme",
      "events.event_location",
      "events.img_url",
      "events.vendors"
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

function update(changes, id) {
  return db("events")
    .update(changes, "id")
    .where({ id })
    .then(([id]) => {
      return getEvent(id);
    });
}

function remove(id) {
  return db("events")
    .where({ id })
    .del();
}
