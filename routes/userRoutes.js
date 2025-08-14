const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../modle/user");

// ✅ CREATE: Register new user
router.post("/register", async (req, res) => {
  try {
    const {  email, password } = req.body;

    // Basic validation
    if ( !email || !password) {
      return res.status(400).json({ error: " email, and password are required." });
    }

    // Check if user already exists
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ error: "Email is already registered." });
    }

    // Hash password
    const saltRounds = 10;
    const hashed = await bcrypt.hash(password, saltRounds);

    // Create user (store email normalized)
    const newUser = await User.create({
      
      email: email.toLowerCase(),
      password: hashed,
    });

    // Remove password before sending response
    const userObj = newUser.toObject();
    delete userObj.password;

    res.status(201).json(userObj);
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Error creating user" });
  }
});

module.exports = router;

