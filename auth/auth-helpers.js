const db = require("../data/db-config");

module.exports = {
  find,
  findById,
  register,
  login
};

function find() {
  return db("planners");
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
      return findById(id);
    });
}

function login(filter) {
  return db("planners")
    .where(filter)
    .first();
}
