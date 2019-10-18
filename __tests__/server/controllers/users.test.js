const chai = require("chai");
const faker = require("faker");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const rewire = require("rewire");
const { expect } = chai;

const User = require("../../../server/models/user");
const userController = require("../../../server/controllers/users");

chai.use(sinonChai);

let sandbox = null;

describe("Users controller", () => {
  let req = {
    user: { id: faker.random.number() },
    value: {
      body: {
        email: faker.internet.email(),
        password: faker.internet.password()
      }
    }
  };
  let res = {
    json: function() {
      return this;
    },
    status: function() {
      return this;
    }
  };

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe("secret", () => {
    it("Should return resource when called", () => {
      sandbox.spy(res, "json");

      return userController.secret(req, res).then(() => {
        expect(res.json.calledWith({ secret: "resource" })).to.be.ok;
        expect(res.json).to.have.been.calledWith({ secret: "resource" });
      });
    });
  });

  describe("Sign In", () => {
    it("Should return token when signIn called", () => {
      sandbox.spy(res, "json");
      sandbox.spy(res, "status");

      return userController.signIn(req, res).then(() => {
        expect(res.status).to.have.been.calledWith(200);
        expect(res.json.callCount).to.equal(1);
      });
    });

    // it("Should return fake token using rewire", () => {
    //   sandbox.spy(res, "json");
    //   sandbox.spy(res, "status");

    //   let signToken = userController.__set__("signToken", user => "fakeToken");

    //   return userController.signIn(req, res).then(() => {
    //     expect(res.status).to.have.been.calledWith({ token: "fakeToken" });
    //     signToken();
    //   });
    // });
  });
});
