const express = require("express");
const router = express.Router();
const path = require("path");
const { protect } = require("../middlewares/authMiddleware");
const Payslip = require("../models/Payslip");

// View all payslips of the logged-in user
router.get("/my", protect, async (req, res) => {
  try {
    const payslips = await Payslip.find({ user: req.user.id });
    res.status(200).json(payslips);
  } catch (err) {
    res.status(500).json({ message: "Error fetching payslips" });
  }
});

// Download a specific payslip file
router.get("/download/:filename", protect, async (req, res) => {
  const { filename } = req.params;

  try {
    const payslip = await Payslip.findOne({
      filename,
      user: req.user.id,
    });

    if (!payslip) {
      return res.status(404).json({ message: "Payslip not found" });
    }

    const filePath = path.join(__dirname, "../uploads", filename);
    res.download(filePath);
  } catch (err) {
    res.status(500).json({ message: "Error downloading file" });
  }
});

module.exports = router;
