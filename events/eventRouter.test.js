const server = require("../api/server");
const request = require("supertest");

describe("eventRouter.js", () => {
  describe("GET /", () => {
    it("should return status 200 (OK)", async () => {
      const res = await request(server).get("/events");
      expect(res.status).toBe(200);
    });
  });
});
