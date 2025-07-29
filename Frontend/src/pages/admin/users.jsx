import { useEffect, useState } from "react";
import { fetchAllUsers, registerNewUser } from "../../services/adminService";

const Users = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filter, setFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    applyFilter();
  }, [filter, allUsers]);

  const loadUsers = async () => {
    try {
      const users = await fetchAllUsers();
      setAllUsers(users);
    } catch (error) {
      console.error("Error loading users:", error);
    }
  };

  const applyFilter = () => {
    if (filter === "all") {
      setFilteredUsers(allUsers);
    } else {
      setFilteredUsers(allUsers.filter((user) => user.role === filter));
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      await registerNewUser(formData);
      alert("User added successfully!");
      setShowForm(false);
      setFormData({ name: "", email: "", password: "", role: "user" });
      loadUsers();
    } catch (error) {
      console.error("Error adding user:", error);
      alert("Error adding user");
    }
  };

  return (
    <div className="p-6 bg-white min-h-screen rounded-md shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-800">User Management</h2>
        <button
          className={`px-5 py-2 font-medium rounded-md shadow transition duration-300 ${
            showForm
              ? "bg-red-500 hover:bg-red-600 text-white"
              : "bg-indigo-600 hover:bg-indigo-700 text-white"
          }`}
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Cancel" : "Add New User"}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleAddUser}
          className="bg-gray-50 border border-gray-200 p-6 rounded-lg mb-6 shadow-sm"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Full Name"
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
            <select
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
            >
              <option value="user">Employee</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button
            type="submit"
            className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md shadow"
          >
            Register User
          </button>
        </form>
      )}

      <div className="mb-4">
        <label className="mr-3 font-semibold text-gray-700">Filter by Role:</label>
        <select
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Users</option>
          <option value="user">Only Employees</option>
          <option value="admin">Only Admins</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead className="bg-indigo-100 text-indigo-800">
            <tr>
              <th className="text-left px-4 py-3 border">Name</th>
              <th className="text-left px-4 py-3 border">Email</th>
              <th className="text-left px-4 py-3 border">Role</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user._id} className="hover:bg-indigo-50">
                  <td className="px-4 py-2 border">{user.name}</td>
                  <td className="px-4 py-2 border">{user.email}</td>
                  <td className="px-4 py-2 border capitalize">
                    {user.role === "user" ? "Employee" : user.role}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-6 text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
