const db = require("../data/db-config");

module.exports = {
  create,
  get
};

function create(newEvent) {
  return db("events").insert(newEvent);
}

function get() {
  return db("events").join("events.portfolio_id", "portfolio.id");
}
