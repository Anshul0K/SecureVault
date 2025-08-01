const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const reimbursementRoutes = require("./routes/reimbursementRoutes");
const loginRoutes = require("./routes/loginLogRoutes");
const payslipRoutes = require("./routes/payslipRoutes");


dotenv.config();
connectDB();

const app = express();
//app.use(cors());
app.use(cors({
  origin: function (origin, callback) {
    // Check if the request origin is null (e.g., file:// protocol)
    if (!origin) {
      return callback(null, true);
    }
    // Allow the request if it comes from any origin
    callback(null, true);
  },
  credentials: true,          
}));
app.use(express.json());


app.get("/", (req, res) => {
  res.send("SecureVault backend live ✅");
});


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);


app.use("/api/payslips", payslipRoutes);

app.use("/api/login-logs", loginRoutes);

app.use("/api/reimbursements", reimbursementRoutes);




const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
