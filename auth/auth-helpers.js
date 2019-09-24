const db = require("../data/db-config");

module.exports = {
  find,
  findById,
  register,
  login
};

function find() {
  return db("planners").select(
    "planners.id",
    "planners.first_name",
    "planners.last_name",
    "planners.username",
    "planners.email",
    "planners.location"
  );
}

function findById(id) {
  return db("planners")
    .where({ id })
    .first();
}

function register(newUser) {
  return db("planners")
    .insert(newUser, "id")
    .then(([id]) => {
      return findById(id).select(
        "planners.first_name",
        "planners.last_name",
        "planners.email",
        "planners.username",
        "planners.location"
      );
    });
}

function login(filter) {
  return db("planners")
    .where(filter)
    .first();
}
