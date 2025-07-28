const Payslip = require("../models/Payslip");
const cloudinary = require("cloudinary").v2;
const User = require("../models/User");



// Admin uploads payslip
// const uploadPayslip = async (req, res) => {
//   try {
//     const { userId } = req.body;

//     if (!req.file || !req.file.path) {
//       return res.status(400).json({ message: "No file uploaded" });
//     }

//     // ⛅ Cloudinary Upload inside try-catch
//     let uploadResult;
//     try {
//       uploadResult = await cloudinary.uploader.upload(req.file.path, {
//         folder: "payslips",
//       });
//     } catch (uploadErr) {
//       console.error("Cloudinary upload failed:", uploadErr);
//       return res.status(500).json({
//         message: "Cloudinary upload failed",
//         error: uploadErr.message,
//       });
//     }

//     // Save uploaded file URL in DB
//     const newPayslip = new Payslip({
//       user: userId,
//       filename: uploadResult.secure_url,
//     });

//     await newPayslip.save();
//     res.status(201).json({
//       message: "Payslip uploaded successfully",
//       payslip: newPayslip,
//     });
//   } catch (err) {
//     console.error("Upload Error:", err);
//     res.status(500).json({ message: "Upload failed", error: err.message });
//   }
// };




const uploadPayslip = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !req.file) {
      return res
        .status(400)
        .json({ message: "Email and file are required" });
    }

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found with provided email" });
    }

    const uploadResult = req.file; // multer already uploaded to Cloudinary

    const newPayslip = new Payslip({
      user: user._id,
      filename: uploadResult.path, // or uploadResult.secure_url
    });

    await newPayslip.save();

    res.status(201).json({
      message: "Payslip uploaded successfully",
      payslip: newPayslip,
    });
  } catch (err) {
    console.error("Upload Error:", err);
    res.status(500).json({ message: "Upload failed", error: err.message });
  }
};

// User views all their payslips
const getMyPayslips = async (req, res) => {
  try {
    const payslips = await Payslip.find({ user: req.user.id }).sort({ uploadedAt: -1 });
    res.status(200).json(payslips);
  } catch (err) {
    res.status(500).json({ message: "Error fetching payslips" });
  }
};

// Download a payslip (returning URL)
const downloadPayslip = async (req, res) => {
  try {
    const payslip = await Payslip.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!payslip) {
      return res.status(404).json({ message: "Payslip not found" });
    }

    res.status(200).json({ 
      downloadUrl: payslip.filename ,
      originalFilename: payslip.originalFilename
    });
  } catch (err) {
    res.status(500).json({ message: "Error downloading payslip" });
  }
};

const getMonthlyPayslipCount = async (req, res) => {
  try {
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const count = await Payslip.countDocuments({
      uploadedAt: { $gte: startOfMonth },
    });

    res.status(200).json({ count });
  } catch (err) {
    res.status(500).json({ message: "Error getting monthly payslip count" });
  }
};

module.exports = {
  uploadPayslip,
  getMyPayslips,
  downloadPayslip,
  getMonthlyPayslipCount,
};
