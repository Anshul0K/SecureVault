const express = require("express");
const router = express.Router();
const upload = require("../middlewares/uploadReimbursementCloudinary");
const { protect, authorize } = require("../middlewares/authMiddleware");
const {
  submitReimbursement,
  getMyReimbursements,
  getAllReimbursements,
  updateStatus,
} = require("../controllers/reimbursementController");

// 🧾 User submits
router.post("/submit", protect, upload.single("proof"), submitReimbursement);

// 👤 User views own reimbursements
router.get("/my", protect, getMyReimbursements);

// 🛡 Admin views all
router.get("/all", protect, authorize("admin"), getAllReimbursements);

// 🛡 Admin updates status
router.put("/status/:id", protect, authorize("admin"), updateStatus);

module.exports = router;
