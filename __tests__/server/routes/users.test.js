const chai = require("chai");
const chaiHttp = require("chai-http");
const faker = require("faker");
const mongoose = require("mongoose");
const { expect } = chai;

const server = require("../../../server/app");

chai.use(chaiHttp);

let token;

describe("Users route", () => {
  const signup = "/users/signup";
  const signin = "/users/signin";
  const secret = "/users/secret";
  const user = {
    email: faker.internet.email(),
    password: faker.internet.password()
  };
  const preSave = {
    email: "mr.sometest@gmail.com",
    password: faker.internet.password()
  };

  before(done => {
    chai
      .request(server)
      .post(signup)
      .send(preSave)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        token = res.body.token;
        done();
      });
  });

  after(done => {
    mongoose.connection.dropDatabase(() => {
      console.log(`\n Test database droped`);
    });
    mongoose.connection.close(() => {
      done();
    });
  });

  describe("Signup", () => {
    it("Should create new user if email not found", done => {
      chai
        .request(server)
        .post(signup)
        .send(user)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).not.to.be.empty;
          expect(res.body).to.have.property("token");
          done();
        });

      it("Should return 403 if email was found", done => {
        chai
          .request(server)
          .post(signup)
          .send(preSave)
          .end((err, res) => {
            expect(res.status).to.equal(409);
            expect(res.body).to.be.deep.equal({
              error: "Email is already in use"
            });
            done();
          });
      });
    });
  });

  describe("Secret", () => {
    it("Should return status 401", done => {
      chai
        .request(server)
        .get(secret)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body).to.be.empty;
          done();
        });
    });

    it("Should return status 200", done => {
      chai
        .request(server)
        .get(secret)
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
  });

  describe("Sign in", () => {
    it("Should return error 400 if user and password empty", done => {
      let emptyUser = {};
      chai
        .request(server)
        .post(signin)
        .send(emptyUser)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });

    // it("Should return 200 and our token", done => {
    //   chai
    //     .request(server)
    //     .post(signin)
    //     .send(preSave)
    //     .end((err, res) => {
    //       expect(res.status).to.equal(200);
    //       expect(res.body).not.to.be.empty;
    //       expect(res.body).to.have.property("token");
    //       done();
    //     });
    // });
  });
});
