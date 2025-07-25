const express = require("express");
const router = express.Router();

const {
  createReimbursement,
  getMyReimbursements,
  getAllReimbursements,
  updateStatus,
} = require("../controllers/reimbursementController");

const { protect, authorize } = require("../middlewares/authMiddleware"); // Import authorize

const upload = require("../middlewares/uploadReimbursement");

// User submits reimbursement with proof upload
router.post("/", protect, upload.single("paymentProof"), createReimbursement);

// User views their own reimbursements
router.get("/my", protect, getMyReimbursements);

// Admin views all reimbursements (authorize middleware called with ["admin"])
router.get("/all", protect, authorize(["admin"]), getAllReimbursements);

// Admin updates reimbursement status (approve/reject) (authorize middleware called with ["admin"])
router.patch("/:id", protect, authorize(["admin"]), updateStatus);

module.exports = router;
