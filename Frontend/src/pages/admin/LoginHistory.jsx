// src/pages/admin/LoginHistory.jsx
import React, { useEffect, useState } from "react";
import { getAllLoginLogs } from "../../services/adminService";

const LoginHistory = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const data = await getAllLoginLogs();
        setLogs(data);
      } catch (error) {
        console.error("Failed to fetch login logs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6">Login History</h2>
      {loading ? (
        <p>Loading...</p>
      ) : logs.length === 0 ? (
        <p>No login history found.</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow rounded">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="px-4 py-2 text-left">S.No.</th>
                <th className="px-4 py-2 text-left">User</th>
                <th className="px-4 py-2 text-left">Date & Time</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, index) => (
                <tr key={log._id || index} className="border-t">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">
                    {log.userId?.name || log.userId?.email || "Unknown User"}
                  </td>
                  <td className="px-4 py-2">
                    {log.timestamp
                      ? new Date(log.timestamp).toLocaleString()
                      : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LoginHistory;
