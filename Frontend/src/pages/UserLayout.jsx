// src/layouts/UserLayout.jsx
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const UserLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => { // You can remove this function if Sidebar's is sufficient
    localStorage.removeItem("token");
    navigate("/login");
  };


  const sidebarLinks = [
    { label: "Profile", path: "/user/profile", icon: "User" },
    { label: "Salary Slips", path: "/user/payslips", icon: "FileStack" },
    { label: "Reimbursements", path: "/user/reimbursements", icon: "DollarSign" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100 text-black">

      <Sidebar navItems={sidebarLinks} />
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout;