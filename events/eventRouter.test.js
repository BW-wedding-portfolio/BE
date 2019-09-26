const server = require("../api/server");
const request = require("supertest");

describe("eventRouter.js", () => {
  describe("GET /", () => {
    it("should return status 200 (OK)", async () => {
      const res = await request(server).get("/events");
      expect(res.status).toBe(200);
    });
  });

  describe("POST /:id/events", () => {
    it("should return status 200 (OK)", async () => {
      const res = await request(server)
        .post("/events/1/events")
        .send({
          event_name: "test",
          event_description: "test test test",
          event_location: "pa",
          theme: "test",
          img_url: "test",
          vendors: "test"
        });
      expect(res.status).toBe(200);
    });

    it("should return status 500 if planner id is wronf (BAD)", async () => {
      const res = await request(server)
        .post("/events/100/events")
        .send({
          event_name: "test",
          event_description: "test test test",
          event_location: "pa",
          theme: "test",
          img_url: "test",
          vendors: "test"
        });
      expect(res.status).not.toBe(200);
    });

    it("should return status 500 if missing a field(BAD)", async () => {
      const res = await request(server)
        .post("/events/1/events")
        .send({
          event_description: "test test test",
          event_location: "pa",
          theme: "test",
          img_url: "test",
          vendors: "test"
        });
      expect(res.status).not.toBe(200);
    });
  });

  describe("GET /:id", () => {
    it("should return status 200 (OK)", async () => {
      const res = await request(server).get("/events/1");
      expect(res.status).toBe(200);
    });
  });

  describe("GET /:id/events", () => {
    it("should return status 200 (OK) if planner with id hasevents", async () => {
      const res = await request(server).get("/events/1/events");
      expect(res.status).toBe(200);
    });

    it("should return status 400 if planner with id has no events (BAD REQUEST)", async () => {
      const res = await request(server).get("/events/2/events");
      expect(res.status).not.toBe(200);
    });
  });
});
