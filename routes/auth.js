const express = require("express");
const { loginUser, registerUser, getProfile } = require("../controllers/authController");
const { authenticate } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authenticate, getProfile);

module.exports = router;
