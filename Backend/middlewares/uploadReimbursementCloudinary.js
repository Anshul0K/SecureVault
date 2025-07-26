const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../utils/cloudinary");

// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: "reimbursements",
//     allowed_formats: ["jpg", "png", "pdf"],
//     transformation: [{ width: 800, height: 800, crop: "limit" }],
//   },
// });

const storage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => { // Use a function for params to dynamically set resource_type
    let resource_type = 'image'; // Default for images
    let transformation = [{ width: 800, height: 800, crop: "limit" }]; // Default transformation for images

    if (file.mimetype === 'application/pdf') {
      resource_type = 'raw'; // Store PDFs as raw files
      transformation = undefined; // <--- IMPORTANT: Remove image transformations for PDFs
    }

    return {
      folder: "reimbursements",
      allowed_formats: ["jpg", "png", "pdf"], // Still allow all these formats
      resource_type: resource_type, // Set dynamically
      transformation: transformation // Set dynamically
    };
  },
});


const upload = multer({ storage });

module.exports = upload;
