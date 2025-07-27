import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

const Sidebar = ({ navItems }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="w-64 min-h-screen bg-gray-800 text-white flex flex-col justify-between p-4">
      <div>
        <div className="mb-8">
            <img src="/assets/no_bg_logo.png" alt="SecureVault Logo" className="h-30 mb-2" />

        </div>
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={`block px-4 py-2 rounded-lg font-medium transition duration-200 ${
                    isActive
                      ? "bg-gray-700 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  {item.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>

      <button
        onClick={handleLogout}
        className="mt-8 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition duration-200"
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
