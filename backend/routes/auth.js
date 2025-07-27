const express = require("express");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const path = require("path");

const router = express.Router();
const usersFilePath = path.join(__dirname, "..", "users.json");

// ✅ Register Route
router.post("/register", async (req, res) => {
  const { name, email, password, role = "user" } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ message: "All fields are required" });

  try {
    const data = fs.readFileSync(usersFilePath, "utf-8");
    const users = JSON.parse(data);

    // Check if user already exists
    if (users.find((user) => user.email === email)) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = { name, email, password: hashedPassword, role };
    users.push(newUser);

    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));

    res.status(201).json({ message: "User registered locally!" });
  } catch (error) {
    console.error("Error writing file:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// ✅ Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Email and password are required" });

  try {
    const data = fs.readFileSync(usersFilePath, "utf-8");
    const users = JSON.parse(data);

    const user = users.find((u) => u.email === email);
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { email: user.email, role: user.role },
      "your_jwt_secret", // Replace with environment variable in production
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
