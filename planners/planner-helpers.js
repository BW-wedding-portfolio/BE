const db = require("../data/db-config");

module.exports = {
  getById
};

function getById(id) {
  return db("planners")
    .where({ id })
    .first()
    .select("id", "first_name", "last_name", "location", "email", "username");
}
