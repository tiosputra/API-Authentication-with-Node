const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

let mongoUri = "mongodb://localhost:27017/apiauthnode";

if (process.env.NODE_ENV === "test")
  mongoUri = "mongodb://localhost:27017/apiauthnode-test";

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const app = express();

// Middleware
if (!process.env.NODE_ENV === "test") app.use(morgan("dev"));
app.use(bodyParser.json());

// Routes
app.use("/users", require("./routes/users"));

module.exports = app;
