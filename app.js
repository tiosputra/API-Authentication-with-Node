const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/apiauthnode", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const app = express();

// Middleware
app.use(morgan("dev"));
app.use(bodyParser.json());

// Routes
app.use("/users", require("./routes/users"));

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening at ${PORT}`));
