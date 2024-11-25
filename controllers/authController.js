const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const users = []; // Mock database for demonstration

// Register user
exports.registerUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });

  res.status(201).json({ message: "User registered successfully" });
};

// Login user
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  const user = users.find((user) => user.username === username);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.json({ token });
};

// Get profile
exports.getProfile = (req, res) => {
  res.json({ user: req.user });
};
