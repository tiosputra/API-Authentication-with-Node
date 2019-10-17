const express = require("express");
const router = express.Router();

const { validateBody, schemas } = require("../helpers/routerHelper");
const UserController = require("../controllers/users");

router.post(
  "/signup",
  validateBody(schemas.authenticationSchema),
  UserController.signUp
);

router.post("/signin", UserController.signIn);

router.post("/secret", UserController.secret);

module.exports = router;
