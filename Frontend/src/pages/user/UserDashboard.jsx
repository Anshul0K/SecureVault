import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "../../services/authService";
import Sidebar from "../../components/Sidebar";
import { Download, Plus } from "lucide-react";

const UserDashboard = () => {
  const [user, setUser] = useState({ name: "Employee" });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile();
        setUser({ ...data, role: "Employee" });
      } catch (error) {
        console.error("Failed to fetch user profile", error);
      }
    };
    fetchProfile();
  }, []);

  // Handles logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Sidebar links for employee
  const sidebarLinks = [
    { label: "Home", path: "/user", icon: "Home" },
    { label: "Salary", path: "/user/salary", icon: "FileText" },
    { label: "Salary Slips", path: "/user/payslips", icon: "FileStack" },
    { label: "Reimbursements", path: "/user/reimbursements", icon: "FileStack" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar links={sidebarLinks} onLogout={handleLogout} />

      <main className="flex-1 p-10">
        <h1 className="text-2xl font-bold mb-4">
          Welcome, {user.name || "Employee"}!
        </h1>

        <button
          className="bg-green-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 mb-6 hover:bg-green-700"
          onClick={() => navigate("/user/payslips")}
        >
          <Download size={20} /> Download Latest Payslip
        </button>

        <button
          className="border border-green-600 text-green-700 px-6 py-3 rounded-xl flex items-center gap-2 mb-6 hover:bg-green-100"
          onClick={() => navigate("/user/reimbursements")}
        >
          <Plus size={20} /> Submit New Reimbursement
        </button>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4">Your Profile Information</h2>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
        </div>

        <a
          href="/help"
          className="fixed bottom-10 right-10 z-50 bg-white p-3 rounded-full shadow-lg hover:scale-105 transition"
          title="Need help?"
        >
          <img
            src="/assets/help_icon.png"
            alt="Help"
            className="w-10 h-10"
          />
        </a>
      </main>
    </div>
  );
};

export default UserDashboard;
