const User = require("../models/user");
const JWT = require("jsonwebtoken");
const { JWT_SECRET } = require("../configuration");

signToken = user => {
  return JWT.sign(
    {
      iss: "API Auth NodeJS",
      sub: user._id,
      iat: new Date().getTime(), // Current Time
      exp: new Date().setDate(new Date().getDate() + 1) // Current Time + 1 day
    },
    JWT_SECRET
  );
};

exports.signUp = async (req, res) => {
  try {
    const { email, password } = req.value.body;

    // Check if there is a user with the same email
    const findUser = await User.findOne({ email });
    if (findUser)
      return res.status(409).json({ error: "Email is already in use" });

    const newUser = new User({ email, password });

    await newUser.save();

    // Generate token
    const token = signToken(newUser);

    res.status(201).json({ token });
  } catch (err) {
    res.json({ err: err.message });
  }
};

exports.signIn = async (req, res) => {
  res.send("Sign in called");
};

exports.secret = async (req, res) => {
  res.json({ user: req.user });
};
