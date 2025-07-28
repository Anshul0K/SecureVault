import React, { useEffect, useState } from "react";
import { getAllReimbursements, updateReimbursementStatus } from "../../services/adminService";

const Reimbursements = () => {
  const [reimbursements, setReimbursements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPendingOnly, setShowPendingOnly] = useState(false);

  useEffect(() => {
    const fetchReimbursements = async () => {
      try {
        const data = await getAllReimbursements();
        setReimbursements(data);
      } catch (error) {
        console.error("Error fetching reimbursements:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReimbursements();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateReimbursementStatus(id, newStatus);
      setReimbursements(prev =>
        prev.map(req => req._id === id ? { ...req, status: newStatus } : req)
      );
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  const getStatusColor = (status) => {
    if (status === "Accepted") return "text-green-600 font-semibold";
    if (status === "Rejected") return "text-red-600 font-semibold";
    return "text-gray-700 font-medium";
  };

  const filteredReimbursements = showPendingOnly
    ? reimbursements.filter(req => req.status === "Pending")
    : reimbursements;

  if (loading) return <div className="p-6 text-lg">Loading...</div>;

  return (
    <div className="p-6 text-base">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Reimbursement Requests</h2>

        <label className="flex items-center space-x-3 text-base cursor-pointer">
          <span>Show Pending Only</span>
          <div className="relative">
            <input
              type="checkbox"
              checked={showPendingOnly}
              onChange={() => setShowPendingOnly(!showPendingOnly)}
              className="sr-only"
            />
            <div className={`w-10 h-5 rounded-full shadow-inner transition-colors duration-300 ${showPendingOnly ? "bg-green-500" : "bg-gray-400"}`}></div>
            <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-300 ${showPendingOnly ? "translate-x-5" : ""}`}></div>
          </div>
        </label>
      </div>

      {filteredReimbursements.length === 0 ? (
        <p>No reimbursement requests found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">User</th>
                <th className="px-4 py-2 text-left">Amount</th>
                <th className="px-4 py-2 text-left">Comment</th>
                <th className="px-4 py-2 text-left">Proof</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredReimbursements.map(req => (
                <tr key={req._id} className="border-t border-gray-200">
                  <td className="px-4 py-2">{req.user?.name || req.user?.email || "N/A"}</td>
                  <td className="px-4 py-2">₹{req.amount}</td>
                  <td className="px-4 py-2">{req.comment || "—"}</td>
                  <td className="px-4 py-2">
                    {req.paymentProof ? (
                      <a
                        href={req.paymentProof}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        View / Download
                      </a>
                    ) : (
                      <span className="text-gray-500">No proof</span>
                    )}
                  </td>
                  <td className={`px-4 py-2 capitalize ${getStatusColor(req.status)}`}>
                    {req.status}
                  </td>
                  <td className="px-4 py-2 space-x-2">
                    {req.status === "Pending" && (
                      <>
                        <button
                          onClick={() => handleStatusChange(req._id, "Accepted")}
                          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleStatusChange(req._id, "Rejected")}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                          Reject
                        </button>
                      </>
                    )}
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

export default Reimbursements;
