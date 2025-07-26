const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const reimbursementRoutes = require("./routes/reimbursementRoutes");


dotenv.config();
connectDB();

const app = express();
//app.use(cors());
app.use(cors({
  origin: "http://localhost:3000", // your frontend origin
  credentials: true,               // allow cookies or headers like Authorization
}));
app.use(express.json());





// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

const payslipRoutes = require("./routes/payslipRoutes");
app.use("/api/payslips", payslipRoutes);



app.use("/api/reimbursements", reimbursementRoutes);




const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
