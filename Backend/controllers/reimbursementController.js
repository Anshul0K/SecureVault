const Reimbursement = require("../models/Reimbursement");
const User = require("../models/User");

// POST /api/reimbursement
exports.createReimbursement = async (req, res) => {
  const { amount, comment } = req.body;
  const paymentProof = req.file?.path;

  if (!amount || !paymentProof) {
    return res.status(400).json({ message: "Amount and proof are required" });
  }

  const newRequest = await Reimbursement.create({
    user: req.user._id,
    amount,
    comment,
    paymentProof,
  });

  res.status(201).json(newRequest);
};

// GET /api/reimbursement/my
exports.getMyReimbursements = async (req, res) => {
  const myRequests = await Reimbursement.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(myRequests);
};

// GET /api/reimbursement/all
exports.getAllReimbursements = async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }

  const all = await Reimbursement.find()
    .populate("user", "name email")
    .sort({ createdAt: -1 });

  res.json(all);
};

// PATCH /api/reimbursement/:id
exports.updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Only admin can update status" });
  }

  if (!["Accepted", "Rejected"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  const reimbursement = await Reimbursement.findById(id);
  if (!reimbursement) return res.status(404).json({ message: "Request not found" });

  reimbursement.status = status;
  await reimbursement.save();

  res.json({ message: "Status updated", reimbursement });
};
