// layout/AdminLayout.jsx
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
    <div className="flex">
      <Sidebar navItems={navItems} />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
