import chai from "chai";
import chatHttp from "chai-http";
import "chai/register-should";
import app from "../index";

chai.use(chatHttp);
const { expect } = chai;
var AUTH_TOKEN = null;

describe("Testing auth system", () => {
  it("It should create a user", done => {
    const user = {
      login: "test",
      password: "testuser",
      name: "Test User",
      role: "10"
    };
    chai
      .request(app)
      .post("/ap/v1/user")
      .set("Accept", "application/json")
      .send(user)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        done();
      });
  });

  it("It should login successfully and receive a JWToken", done => {
    const user = {
      login: "test",
      password: "testuser"
    };
    chai
      .request(app)
      .post("/api/v1/user/auth")
      .set("Accept", "application/json")
      .send(user)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        AUTH_TOKEN = res.body.data;
        done();
      });
  });
});

describe("Testing the get all GalleryPics endpoind:", () => {
  it("It should create a gallery pic", done => {
    chai
      .request(app)
      .post("/api/v1/gallery")
      .set("Accept", "application/json")
      .set("Authorization", AUTH_TOKEN)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });

  it("It should return all GalleryPics", done => {
    chai
      .request(app)
      .get("/api/v1/gallery")
      .set("Accept", "application/json")
      .set("Authorization", AUTH_TOKEN)
      .end((err, res) => {
        const { title, description, imageUrl } = res.body.data;
        expect(res.status).to.equal(200);
        expect(title).to.be.a("string").that.is.not.empty;
        expect(description).to.be.a("string").that.is.not.empty;
        expect(imageUrl).to.be.a("string").that.is.not.empty;
        done();
      });
  });
});
