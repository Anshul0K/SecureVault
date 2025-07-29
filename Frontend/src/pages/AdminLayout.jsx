import React from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const navItems = [
  { label: "Dashboard", path: "/admin/dashboard" },
  { label: "Login History", path: "/admin/login-activity" },
  { label: "Payslips", path: "/admin/payslips" },
  { label: "Reimbursements", path: "/admin/reimbursements" },
  { label: "Users", path: "/admin/users" },
];

const AdminLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar - fixed width, full height, no scroll */}
      <div className="w-64 bg-white border-r">
        <Sidebar navItems={navItems} />
      </div>

      {/* Main content scrolls */}
      <div className="flex-1 overflow-y-auto bg-gray-100 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
