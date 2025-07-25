const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const LoginLog = require("../models/LoginLog");
const User = require("../models/User");

// Only admin can view all login logs
router.get("/", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const logs = await LoginLog.find().populate("userId", "name email role");
    res.status(200).json(logs);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch logs" });
  }
});

module.exports = router;
