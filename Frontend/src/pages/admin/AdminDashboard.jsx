import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Card from "../../components/Card";
import RecentLogin from "../../components/RecentLogin";

import {
  getPayslipMonthlyCount,
  getUserCount,
  getPendingReimbursementCount,
  getRecentLoginLogs,
} from "../../services/adminService";

const navItems = [
  { label: "Dashboard", path: "/admin/dashboard" },
  { label: "Login History", path: "/admin/login-activity" },
  { label: "Payslips", path: "/admin/payslips" },
  { label: "Reimbursements", path: "/admin/reimbursements" },
  { label: "Users", path: "/admin/users" },
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [dashboardData, setDashboardData] = useState({
    pendingReimbursements: 0,
    totalEmployees: 0,
    payslipsUploaded: 0,
    recentLogins: [],
  });

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const payslipCount = await getPayslipMonthlyCount();
        const userCount = await getUserCount();
        const pendingReimbursements = await getPendingReimbursementCount();
        const recentLogins = await getRecentLoginLogs();

        setDashboardData({
          payslipsUploaded: payslipCount,
          totalEmployees: userCount,
          pendingReimbursements,
          recentLogins,
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboard();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar links={navItems} onLogout={handleLogout} />

      <main className="flex-1 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card title="Payslips Uploaded" value={dashboardData.payslipsUploaded} />
          <Card title="Total Employees" value={dashboardData.totalEmployees} />
          <Card title="Pending Reimbursements" value={dashboardData.pendingReimbursements} />
        </div>

        <RecentLogin
          logs={dashboardData.recentLogins}
          onViewAll={() => navigate("/admin/login-activity")}
        />
      </main>
    </div>
  );
};

export default AdminDashboard;
