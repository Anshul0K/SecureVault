// // Sidebar.js (inside src/components)
// import { useNavigate, useLocation } from "react-router-dom";
// import React from "react";

// const Sidebar = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const navItems = [
//     { label: "Dashboard", path: "/admin/dashboard" },
//     { label: "Login History", path: "/admin/login-activity" },
//     { label: "Payslips", path: "/admin/payslips" },
//     { label: "Reimbursements", path: "/admin/reimbursements" },
//     { label: "Users", path: "/admin/users" },
//   ];

//   return (
//     <div className="w-64 h-screen bg-gray-800 text-white p-4 flex flex-col">
//       <div className="flex flex-col items-center mb-4">
//         <img src="/assets/no_bg_logo.png" alt="Logo" className="h-30 mb-2" />
//         <hr className="border-gray-600 w-full" />
//       </div>
//       <div className="space-y-2">
//         {navItems.map((item, idx) => (
//           <React.Fragment key={item.path}>
//             <button
//               onClick={() => navigate(item.path)}
//               className={`w-full text-left px-3 py-2 rounded transition-colors duration-200 ${
//                 location.pathname === item.path ? "bg-gray-700" : "hover:bg-gray-700"
//               }`}
//             >
//               {item.label}
//             </button>
//             {idx < navItems.length - 1 && <hr className="border-gray-600" />}
//           </React.Fragment>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Sidebar;
import { useNavigate, useLocation } from "react-router-dom";
import React from "react";

const Sidebar = ({ links = [], onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-4 flex flex-col justify-between">
      <div>
        <div className="flex flex-col items-center mb-4">
          <img src="/assets/no_bg_logo.png" alt="Logo" className="h-30 mb-2" />
          <hr className="border-gray-600 w-full" />
        </div>
        <div className="space-y-2">
          {links.map((item, idx) => (
            <React.Fragment key={item.path}>
              <button
                onClick={() => navigate(item.path)}
                className={`w-full text-left px-3 py-2 rounded transition-colors duration-200 ${
                  location.pathname === item.path
                    ? "bg-gray-700"
                    : "hover:bg-gray-700"
                }`}
              >
                {item.label}
              </button>
              {idx < links.length - 1 && <hr className="border-gray-600" />}
            </React.Fragment>
          ))}
        </div>
      </div>

      {onLogout && (
        <button
          onClick={onLogout}
          className="w-full mt-4 px-3 py-2 bg-red-600 hover:bg-red-700 rounded text-white"
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default Sidebar;
