const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  })
};

// exports.register = async (req, res) => {
//   const { name, email, password, role } = req.body;

//   try {
//     const existing = await User.findOne({ email });
//     if (existing) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     const hashed = await bcrypt.hash(password.trim(), 10);

//     //const hashed = await bcrypt.hash(password, 10);


//     const user = await User.create({
//       name,
//       email,
//       password: hashed,
//       role,
//     });

//     const token = generateToken(user._id);

//     res.status(201).json({
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//       },
//       token,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashed = await bcrypt.hash(password.trim(), 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
      role: role || "user", // Default to 'user' if not provided
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;


  try {
    const user = await User.findOne({ email });

    if (!user){
        return res.status(400).json({ message: "Invalid credentials" });
    }


    const match = await bcrypt.compare(password.trim(), user.password);



    if (!match) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const LoginLog = require("../models/LoginLog");

  await LoginLog.create({
    userId: user._id,
    ipAddress: req.ip,
    userAgent: req.headers["user-agent"],
  });

    const token = generateToken(user._id);

    res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get total users (excluding admins)
exports.getUserCount = async (req, res) => {
  try {
    const count = await User.countDocuments({ role: { $ne: "admin" } });
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get all users including admins and normal users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password").sort({ createdAt: -1 });
    // "-password" excludes password field
    res.status(200).json({ users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error" });
  }
};

