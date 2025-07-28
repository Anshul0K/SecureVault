import { useEffect, useState } from "react";
import { getUserPayslips, downloadPayslipById } from "../../services/userServices";
import { Download } from "lucide-react";

const UserPayslips = () => {
  const [payslips, setPayslips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayslips = async () => {
      try {
        const data = await getUserPayslips();
        setPayslips(data);
      } catch (error) {
        console.error("Error fetching payslips:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPayslips();
  }, []);

  const handleDownload = async (id, uploadedAt) => {
    try {
      const url = await downloadPayslipById(id);

      // Get month name for file name
      const date = new Date(uploadedAt);
      const monthName = date.toLocaleString("default", { month: "long" });
      const filename = `${monthName}_Payslip.pdf`;

      // Trigger download manually
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (err) {
      console.error("Error downloading payslip:", err);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Your Salary Slips</h1>

      {loading ? (
        <p>Loading payslips...</p>
      ) : payslips.length === 0 ? (
        <p className="text-gray-600">No payslips uploaded yet.</p>
      ) : (
        <ul className="space-y-4">
          {payslips.map((slip) => {
            const date = new Date(slip.uploadedAt);
            const monthName = date.toLocaleString("default", { month: "long" });

            return (
              <li
                key={slip._id}
                className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold text-lg">{monthName} Payslip</p>
                  <p className="text-sm text-gray-500">
                    Uploaded: {date.toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => handleDownload(slip._id, slip.uploadedAt)}
                  className="flex items-center gap-2 text-green-600 hover:underline"
                >
                  <Download size={18} />
                  Download
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default UserPayslips;
