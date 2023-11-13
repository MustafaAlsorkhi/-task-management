const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const User = require("../models/user");

// Signup Start
const signup = async (req, res) => {
  const { username, email, password } = req.body;

  // Input validation using Joi
  const schema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  const { error } = schema.validate({ username, email, password });
  if (error) {
    return res.status(400).json({ message: "Validation error", error: error.details });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    res.status(201).json({ user: savedUser._id });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
// Signup Start

// Login Start
const login = async (req, res) => {
  // Input validation using Joi
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Validation error", error: error.details });
  }

  try {
    // Check if the user exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Compare passwords
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Create and assign a JWT token
    const secretKey = process.env.SECRET_KEY;

    if (!secretKey) {
      console.error("SECRET_KEY is not defined in the .env file");
      return res.status(500).json({ message: "Internal server error" });
    }
    
    // Create and assign a JWT token
    const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: "1h" });
    res.cookie("accessToken", token, { httpOnly: true });

    res.json({ token});
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
// Login End

module.exports = {
  signup,
  login
};