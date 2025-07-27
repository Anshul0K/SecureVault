const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadPayslipCloudinary");
const {
  uploadPayslip,
  getMyPayslips,
  downloadPayslip,
  getMonthlyPayslipCount,
} = require("../controllers/payslipController");

// 📤 Admin uploads a payslip for a user
router.post(
  "/upload",
  protect,
  authorize("admin"),
  upload.single("payslip"),
  uploadPayslip
);

router.get(
  "/monthly/count",
  protect,
  authorize("admin"),
  getMonthlyPayslipCount
);

// 👤 User views all their payslips
router.get("/my", protect, getMyPayslips);

// 📥 User downloads a payslip (returns Cloudinary URL)
router.get("/download/:id", protect, downloadPayslip);

module.exports = router;
