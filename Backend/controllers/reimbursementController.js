const Reimbursement = require("../models/Reimbursement");
const cloudinary = require("cloudinary").v2;

//submit
exports.submitReimbursement = async (req, res) => {
  try {
    const { amount, comment } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Proof of payment is required" });
    }

    const reimbursement = await Reimbursement.create({
      user: req.user._id,
      amount,
      comment,
      paymentProof: req.file.path, // cloudinary URL
    });

    res.status(201).json({
      message: "Reimbursement submitted successfully",
      reimbursement,
    });
  } catch (error) {
    console.error("Error submitting reimbursement:", error);
    res.status(500).json({ message: "Server error submitting reimbursement" });
  }
};


// 👤 Get my reimbursements
exports.getMyReimbursements = async (req, res) => {
  try {
    const reimbursements = await Reimbursement.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(reimbursements);
  } catch (err) {
    res.status(500).json({ message: "Error fetching reimbursements" });
  }
};

// 🛡 Admin: Get all
exports.getAllReimbursements = async (req, res) => {
  try {
    const reimbursements = await Reimbursement.find().populate("user", "name email").sort({ createdAt: -1 });
    res.json(reimbursements);
  } catch (err) {
    res.status(500).json({ message: "Error fetching reimbursements" });
  }
};

// ✅ Admin: Update status
exports.updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!["Pending", "Accepted", "Rejected"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  try {
    const reimbursement = await Reimbursement.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!reimbursement) return res.status(404).json({ message: "Not found" });

    res.json(reimbursement);
  } catch (err) {
    res.status(500).json({ message: "Error updating status" });
  }
};

exports.countPendingReimbursements = async (req, res) => {
  try {
    const count = await Reimbursement.countDocuments({ status: "Pending" });
    res.json({ count });
  } catch (err) {
    console.error("Error counting pending reimbursements:", err);
    res.status(500).json({ message: "Server error while counting pending reimbursements" });
  }
};
