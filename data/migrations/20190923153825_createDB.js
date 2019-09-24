exports.up = function(knex) {
  return knex.schema
    .createTable("planners", planner => {
      planner.increments();
      planner.string("first_name", 100).notNullable();
      planner.string("last_name", 100).notNullable();
      planner
        .string("email", 255)
        .notNullable()
        .unique();
      planner
        .string("username", 100)
        .notNullable()
        .unique();
      planner.string("password", 255).notNullable();
      planner.string("location", 255).notNullable();
    })
    .createTable("events", event => {
      event.increments();
      event.string("event_name", 255).notNullable();
      event.text("event_description").notNullable();
      event.string("event_location", 100).notNullable();
      event.string("theme", 100).notNullable();
      event
        .integer("planner_id")
        .unsigned()
        .references("id")
        .inTable("planners")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("events").dropTableIfExists("planners");
};
