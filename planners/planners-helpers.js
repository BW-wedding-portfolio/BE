const db = require("../data/db-config");

module.exports = {
  get,
  add
  //   update,
  //   remove
};

function get(id) {
  return db("planners")
    .join("portfolio", "planners.id", "portfolio.planner_id")
    .join("events", "events.portfolio_id", "portfolio.id")
    .where({ "planners.id": id });
}

function add(id, newEvent) {
  return db("planners")
    .insert(newEvent, "id")
    .join("portfolio", "planners.id", "portfolio.planner_id")
    .join("events", "events.portfolio_id", "portfolio.id")
    .where({ "planners.id": id });
}

// need each user to create a portfolio during sign up or something
