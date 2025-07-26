// /pages/ProtectedTest.js
import React, { useEffect, useState } from "react";
import axios from "../services/axiosInstance";

const ProtectedTest = () => {
  const [message, setMessage] = useState("⌛ Loading protected route...");

  useEffect(() => {
    axios.get("/api/protected-test")
      .then(res => setMessage(res.data.message))
      .catch(err => {
        console.error(err);
        setMessage("❌ Unauthorized or error accessing protected route");
      });
  }, []);

  return (
    <div className="p-6 text-2xl text-center font-semibold text-red-600">
      {message}
    </div>
  );
};

export default ProtectedTest;
