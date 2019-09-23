exports.up = function(knex) {
  return knex.schema
    .createTable("users", user => {
      user.increments();
      user
        .string("username", 100)
        .notNullable()
        .unique();
      user.String("password", 255).notNullable();
    })
    .createTable("planners", planner => {
      planner.increments();
      planner.string("first_name", 100).notNullable();
      planner.string("last_name", 100).notNullable();
      planner
        .string("username", 100)
        .notNullable()
        .unique();
    })
    .createTable("portfolio", portfolio => {
      portfolio.increments();
      portfolio.string("portfolio_name", 255).notNullable();
      portfolio
        .integer("planner_id")
        .unsigned()
        .references("id")
        .inTable("planners")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("events", event => {
      event.increments();
      event.string("event_name", 255).notNullable();
      event.text("event_description");
      event.string("event_location", 100).notNullable();
      event
        .integer("portfolio_id")
        .unsigned()
        .references("id")
        .inTable("portfolio")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("events")
    .dropTableIfExists("portfolio")
    .dropTableIfExists("planners")
    .dropTableIfExists("users");
};
