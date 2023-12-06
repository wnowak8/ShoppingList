const express = require("express");

const cors = require("cors"); 
require("dotenv").config();

const mongoose = require("mongoose");
mongoose
  .connect(
    'mongodb+srv://' +
      process.env.DB_USERNAME +
      ':' +
      process.env.DB_PASSWORD +
      '@cluster0.xdx5ekx.mongodb.net/?retryWrites=true&w=majority'
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

const app = express();

const morgan = require("morgan");
app.use(morgan("combined"));

const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.use(cors());

const itemRoutes = require("./api/routes/items");
const userRoutes = require("./api/routes/users");

app.use("/items", itemRoutes);
app.use("/users", userRoutes);

app.use((req, res, next) => {
  res.status(404).json({ message: "Nie odnaleziono" });
});

module.exports = app;
