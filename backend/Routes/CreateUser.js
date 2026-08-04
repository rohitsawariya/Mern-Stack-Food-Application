const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const JWT_SECRET = "ThisIsASecretCodeWhichIs35Charaters";

router.post(
  "/createuser",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password should be at least 5 characters").isLength({ min: 5 }),
    body("name", "Name should be at least 3 characters").isLength({ min: 3 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // generate hashed password
      const salt = bcrypt.genSaltSync(10);
      const securedPass = bcrypt.hashSync(req.body.password, salt);

      // create user
      const user = await User.create({
        name: req.body.name,
        password: securedPass,
        email: req.body.email,
        location: req.body.location,
      });

      return res.status(201).json({ success: true, user });
    } catch (err) {
      console.error("Error creating user:", err.message);
      return res.status(500).json({ success: false, message: "Server Error" });
    }
  }
);

router.post(
  "/loginuser",
  [
    body("email").isEmail().withMessage("Enter a valid email"),
    body("password", "Password must be at least 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    // validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // check if user exists
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid credentials" });
      }

      // compare password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid credentials" });
      }

      // jwt payload
      const payload = {
        user: {
          id: user.id,
        },
      };

      // sign token
      const authToken = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

      res.json({ success: true, authToken });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);


module.exports = router;
