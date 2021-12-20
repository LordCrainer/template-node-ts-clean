import { doesNotMatch } from "assert";
import request from "supertest";
import app from "../../../src/config/server";
const { user } = require("./auth.mock.json");
jest.setTimeout(10000);
// import { user } from "./auth.mock.json";
/**
 * Authentication tests
 */
describe("Authentication", () => {
  /**
   * storing globals to access them in API requests
   */
  var variables = {
    token: "",
  };
  test("should SignUp a new User", async () => {
    const res = await request(app).post("/v1/auth/signup").send(user);
    /*       .expect("Content-type", /json/)
      .expect((res) => {
        res.body.status.should.equal(200);
        res.body.logged.should.equal(true);
        res.body.message.should.be.a("string");
        global.token = res.body.token;
      }); */
    expect(res.statusCode).toBe(200);
    expect(typeof res.body.message).toBe("string");
  });
  test("should Sign In", async () => {
    const res = await request(app).post("/v1/auth/login").send(user);
    /*       .expect("Content-type", /json/)
      .expect((res) => {
        res.body.status.should.equal(200);
        res.body.logged.should.equal(true);
        res.body.message.should.be.a("string");
        global.token = res.body.token;
      }); */
    expect(res.statusCode).toBe(200);
    expect(typeof res.body.message).toBe("string");
  });
  afterAll((done) => {
    done();
  });
});
