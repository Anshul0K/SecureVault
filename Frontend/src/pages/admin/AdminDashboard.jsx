import React, { useEffect, useState } from "react";
import Card from "../../components/Card";
import RecentLogin from "../../components/RecentLogin";

import {
  getPayslipMonthlyCount,
  getUserCount,
  getPendingReimbursementCount,
  getRecentLoginLogs,
} from "../../services/adminService";

const AdminDashboard = () => {
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
          pendingReimbursements: pendingReimbursements,
          recentLogins: recentLogins,
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboard();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card title="Payslips Uploaded this Month" value={dashboardData.payslipsUploaded} />
        <Card title="Total Employees" value={dashboardData.totalEmployees} />
        <Card title="Pending Reimbursements" value={dashboardData.pendingReimbursements} />
      </div>

      <RecentLogin logs={dashboardData.recentLogins} />
    </div>
  );
};

export default AdminDashboard;
