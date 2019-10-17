const User = require("../models/user");

exports.signUp = async (req, res) => {
  try {
    const { email, password } = req.value.body;

    // Check if there is a user with the same email
    const findUser = await User.findOne({ email });
    if (findUser)
      return res.status(409).json({ error: "Email is already in use" });

    const newUser = new User({ email, password });

    await newUser.save();

    res.json({ users: "created" });
  } catch (err) {
    res.json({ err: err.message });
  }
};

exports.signIn = async (req, res) => {
  res.send("Sign in called");
};

exports.secret = async (req, res) => {
  res.send("Secret called");
};
