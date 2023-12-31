const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const router = express.Router();

router.post("/signup", async (req, res, next) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = new User({
      email: req.body.email,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({ message: "User successfully added" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

router.post("/login", (req, res, next) => {
  User.findOne({ email: req.body.email }).then((user) => {
    if (!user) return res.status(401).json({ wiadomosc: "Authentication error" });
    bcrypt.compare(req.body.password, user.password).then((result) => {
      if (result) {
        const token = jwt.sign({ email: user.email }, process.env.JWT_KEY, {
          expiresIn: "1h",
        });
        return res.status(200).json({
          wiadomosc: "Successfully logged in",
          token: token,
        });
      } else return res.status(401).json({ wiadomosc: "Authentication error" });
    });
  });
});
module.exports = router;
