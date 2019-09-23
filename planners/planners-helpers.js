const db = require("../data/db-config");

module.exports = {
  get
  //   add,
  //   update,
  //   remove
};

function get(id) {
  return db("planners")
    .join("portfolio", "id", "planner_id")
    .where({ planner_id: id });
}

// need each user to create a portfolio during sign up or something
