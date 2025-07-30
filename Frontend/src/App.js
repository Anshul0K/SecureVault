import Home from "./pages/Home";
import Login from "./pages/Login"; 
import ProtectedRoute from "./routes/ProtectedRoute";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import UserLayout from "./pages/UserLayout";
import UserDashboard from "./pages/user/UserDashboard";
import UserPayslips from "./pages/user/UserPayslips";
import UserReimbursements from "./pages/user/Reimbursements";

import AdminLayout from "./pages/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import PayslipPage from "./pages/admin/PayslipPage"; 
import LoginHistory from "./pages/admin/LoginHistory"; 
import Reimbursements from "./pages/admin/Reimbursements"; 
import UsersPage from "./pages/admin/users"; 
import PrivateRouteAdmin from "./routes/PrivateRouteAdmin";
import Help from "./pages/Help";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/help" element={<Help />} /> 

        <Route path="/user" element={<ProtectedRoute> <UserLayout/> </ProtectedRoute>}>
          <Route index element={<Navigate to="profile" />} /> 
          <Route path="profile" element={<UserDashboard />} />
          <Route path="payslips" element={<UserPayslips />} />
          <Route path="reimbursements" element={<UserReimbursements />} />
        </Route>


        <Route path="/admin" element={ <PrivateRouteAdmin> <AdminLayout /> </PrivateRouteAdmin>}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="payslips" element={<PayslipPage />} />
          <Route path="reimbursements" element={<Reimbursements />} />
          <Route path="login-activity" element={<LoginHistory />} />
          <Route path="users" element={<UsersPage />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
