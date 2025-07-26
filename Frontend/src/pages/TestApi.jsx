import React, { useEffect, useState } from "react";
import axios from "../services/axiosInstance";

const TestApi = () => {
  const [message, setMessage] = useState("⌛ Loading...");

  useEffect(() => {
    axios
      .get("/api/test") // assuming your backend route is at /api/test
      .then((res) => {
        setMessage(res.data.message || "✅ API working!");
      })
      .catch((err) => {
        console.error(err);
        setMessage("❌ Error connecting to API");
      });
  }, []);

  return (
    <div className="p-6 text-2xl text-center font-semibold text-blue-600">
      {message}
    </div>
  );
};

export default TestApi;
