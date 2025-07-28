import { useState } from "react";
import { toast } from "react-toastify";
import { uploadPayslip } from "../../services/adminService"; 

const PayslipUploadForm = () => {
  const [email, setEmail] = useState("");
  const [payslip, setPayslip] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setPayslip(e.dataTransfer.files[0]);
  };

  const handleFileChange = (e) => {
    setPayslip(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !payslip) {
      toast.error("Email and payslip are required");
      return;
    }

    const formData = new FormData();
    formData.append("email", email);
    formData.append("payslip", payslip);

    try {
      setIsLoading(true);
      await uploadPayslip(formData);
      toast.success("Payslip uploaded successfully");
      setEmail("");
      setPayslip(null);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error uploading payslip");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Submit Payslip</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block font-medium text-gray-700 mb-2">Upload Payslip</label>
          <div
            className="w-full p-6 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            <p className="text-gray-500">Drag & Drop payslip here</p>
            <p className="text-gray-400 my-2">or</p>
            <label className="inline-block px-4 py-2 bg-blue-600 text-white rounded cursor-pointer">
              Browse Files
              <input type="file" className="hidden" onChange={handleFileChange} />
            </label>
            {payslip && <p className="mt-2 text-sm text-gray-600">{payslip.name}</p>}
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50"
        >
          {isLoading ? "Submitting..." : "Submit Payslip"}
        </button>
      </form>
    </div>
  );
};

export default PayslipUploadForm;
