const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middlewares/authMiddleware");

// Example: Protected route
router.get("/profile", protect, (req, res) => {
  res.json({ message: "Welcome, " + req.user.name });
});

// Example: Admin only
router.get("/admin", protect, authorize(["admin"]), (req, res) => {
  res.json({ message: "Admin dashboard for " + req.user.name });
});

module.exports = router;
