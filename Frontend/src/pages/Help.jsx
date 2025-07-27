import React from "react";

const Help = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 mt-10 text-lg">
      <div className="flex flex-col items-center mb-8">
        <img
          src="/assets/Horizontal_Logo.png"
          alt="SecurePay Vault Logo"
          className="w-64 mb-6"
        />
        <h1 className="text-4xl font-bold text-blue-700">Need Help?</h1>
      </div>

      <p className="text-gray-700 mb-4">
        Welcome to the Help Center. If you're facing any issues related to your SecurePay Vault account, feel free to reach out to us.
      </p>

      <p className="text-gray-700 mb-4">
        Here are some common situations where you might need assistance:
      </p>

      <ul className="list-disc list-inside text-gray-700 mb-6">
        <li>Login or authentication issues</li>
        <li>Reimbursement not reflecting or rejected</li>
        <li>Payslip not downloadable</li>
        <li>Incorrect user role or access</li>
      </ul>

      <p className="text-gray-700 mb-6">
        Our team usually responds within <strong>24–48 hours</strong>.
      </p>

      <hr className="my-6 border-gray-300" />

      <div>
        <h2 className="text-2xl font-semibold text-green-700 mb-3">📞 Contact Us</h2>
        <p className="text-gray-800 mb-1">📧 Email: <a href="mailto:support@securepayvault.com" className="text-blue-600 underline">support@securepayvault.com</a></p>
        <p className="text-gray-800">📱 Mobile: <a  className="text-blue-600 underline">+91 9999111111</a></p>
      </div>
    </div>
  );
};

export default Help;
