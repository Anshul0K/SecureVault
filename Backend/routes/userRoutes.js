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



// const upload = require("../middlewares/uploadPayslipCloudinary");


// const Payslip = require("../models/Payslip");

// router.post(
//   "/upload",
//   protect,
//   authorize(["admin"]),
//   upload.single("file"),
//   async (req, res) => {
//     const { userId } = req.body; // ID of the user this payslip is for

//     if (!req.file || !userId) {
//       return res.status(400).json({ message: "File or userId missing" });
//     }

//     try {
//       const payslip = new Payslip({
//         user: userId,
//         filename: req.file.path, // Cloudinary URL
//       });

//       await payslip.save();

//       res.status(200).json({
//         message: "File uploaded and saved successfully",
//         file: req.file.filename,
//       });
//     } catch (err) {
//       res.status(500).json({ message: "Upload failed", error: err.message });
//     }
//   }
// );

module.exports = router;
