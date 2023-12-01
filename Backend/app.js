// import expresa
const express = require("express");

// import cors
const cors = require("cors"); 
// importuję zmienne środowiskowe
require("dotenv").config();

// import mongoose
const mongoose = require("mongoose");
// połączenie z bazą
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

// instancja expresa
const app = express();

// uruchamiam logera
const morgan = require("morgan");
app.use(morgan("combined"));

// uruchamiam body parser
const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.use(cors());

// routy
const itemRoutes = require("./api/routes/items");
const userRoutes = require("./api/routes/users");

app.use("/items", itemRoutes);
app.use("/users", userRoutes);

app.use((req, res, next) => {
  res.status(404).json({ message: "Nie odnaleziono" });
});

module.exports = app;
