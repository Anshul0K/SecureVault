const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;




// configure cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// configure storage for multer
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "payslips",
    allowed_formats: ["pdf"],
    resource_type: "raw", // important for non-image files like PDF
  },
});

const upload = multer({ storage });

module.exports = upload;
