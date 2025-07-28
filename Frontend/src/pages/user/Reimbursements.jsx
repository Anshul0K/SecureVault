import React, { useState } from "react";
import { submitUserReimbursement } from "../../services/userServices";

const ReimbursementForm = () => {
  const [amount, setAmount] = useState("");
  const [comment, setComment] = useState("");
  const [proof, setProof] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!amount || !proof) {
      setError("Amount and proof are required.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("amount", amount);
      formData.append("comment", comment);
      formData.append("proof", proof);

      await submitUserReimbursement(formData);

      setSubmitted(true);
      setAmount("");
      setComment("");
      setProof(null);
    } catch (err) {
      console.error("Submission failed:", err);
      setError("Submission failed. Try again later.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-xl rounded-2xl mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Submit Reimbursement
      </h2>

      {submitted ? (
        <div className="text-center">
          <p className="text-green-600 font-semibold mb-4">
            Reimbursement submitted successfully!
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Submit Another
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && <p className="text-red-600 text-sm">{error}</p>}

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount (INR)
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter amount"
              required
            />
          </div>

          {/* Comment */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Comment (optional)
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              rows={3}
              placeholder="Description or notes..."
            ></textarea>
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Payment Proof
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <p className="text-gray-500 mb-2">Drag & Drop proof here</p>
              <p className="text-sm text-gray-400 mb-2">or</p>
              <input
                type="file"
                accept="image/*,application/pdf"
                onChange={(e) => setProof(e.target.files[0])}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-700 transition"
              >
                Browse Files
              </label>
              {proof && (
                <p className="text-sm mt-2 text-gray-600">
                  Selected: <strong>{proof.name}</strong>
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
            >
              Submit Reimbursement
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ReimbursementForm;
