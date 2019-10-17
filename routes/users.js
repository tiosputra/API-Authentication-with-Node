const express = require("express");
const router = express.Router();
const passport = require("passport");
const passportConf = require("../passport");

const { validateBody, schemas } = require("../helpers/routerHelper");
const UserController = require("../controllers/users");

router.post(
  "/signup",
  validateBody(schemas.authenticationSchema),
  UserController.signUp
);

router.get(
  "/signin",
  validateBody(schemas.authenticationSchema),
  passport.authenticate("local", { session: false }),
  UserController.signIn
);

router.get(
  "/secret",
  passport.authenticate("jwt", { session: false }),
  UserController.secret
);

module.exports = router;
