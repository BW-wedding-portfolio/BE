const request = require("supertest");
const server = require("../api/server");
const knex = require("../data/db-config");

describe("authRouter.js", () => {
  beforeEach(async () => {
    await knex.migrate.rollback();
    await knex.migrate.latest();
  });
  describe("POST /register", () => {
    it("should register a Planenr and return a 201(OK),", async () => {
      const res = await request(server)
        .post("/auth/register")
        .send({
          first_name: "testing",
          last_name: "db",
          email: "test@test.com",
          username: "npatt101",
          password: "test123",
          location: "pa"
        });
      expect(res.status).toBe(201);
    });
  });
});

describe("POST /login", () => {
  it("should return a status 200 (OK) and login the Planner", async () => {
    const res = await request(server)
      .post("/auth/login")
      .send({ username: "npatt101", password: "test123" });
    expect(res.status).toBe(200);
  });
});

describe("POST /login", () => {
  it("should return a status 401 if user credentials are wrong", async () => {
    const res = await request(server)
      .post("/auth/login")
      .send({ username: "npatt101", password: "test13" });
    expect(res.status).toBe(401);
  });
});
