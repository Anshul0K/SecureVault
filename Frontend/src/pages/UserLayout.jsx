import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const UserLayout = () => {
  const navigate = useNavigate();

  const sidebarLinks = [
    { label: "Profile", path: "/user/profile", icon: "User" },
    { label: "Salary Slips", path: "/user/payslips", icon: "FileStack" },
    { label: "Reimbursements", path: "/user/reimbursements", icon: "DollarSign" },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100 text-black">
      {/* Sidebar: fixed width, no scroll */}
      <div className="w-64 bg-white border-r">
        <Sidebar navItems={sidebarLinks} />
      </div>

      {/* Main content: scrollable only */}
      <main className="flex-1 overflow-y-auto p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout;
