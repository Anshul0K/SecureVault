import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";

const Login = () => {
  const navigate = useNavigate(); // ← add this line

  
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); 

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await loginUser(formData);
      localStorage.setItem("token", data.token);  // Save token to localStorage
      if (data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/user");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid Credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex justify-center items-center bg-[linear-gradient(168deg,rgba(24,72,184,1)_0%,rgba(92,237,184,1)_50%,rgba(62,235,56,1)_100%)]">
      <div className="max-w-md w-11/12 p-8 bg-white border border-gray-300 rounded-3xl shadow-md">
        <img src="/assets/Horizontal_Logo.png" className="mt-[-30px] mb-[-20px]"></img>
        <form onSubmit={handleSubmit}>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
          <label className="block mb-1 font-medium">Password</label>

          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="w-full p-2 border border-gray-300 rounded pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(prev => !prev)}
              className="absolute right-2 top-2 text-gray-600 hover:text-gray-900"
              tabIndex={-1} // prevent tabbing to button
            >

              {showPassword ? (
                // Eye Open SVG icon
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              ) : (

                // Eye Closed SVG icon
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.27-2.943-9.543-7a10.05 10.05 0 012.158-3.376M6.171 6.171a9.96 9.96 0 015.829-1.743c4.478 0 8.27 2.943 9.543 7a10.055 10.055 0 01-3.27 4.384M3 3l18 18" />
                </svg>
              )}
            </button>
          </div>

          {error && <p className="text-red-600 mb-3">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-[10px] bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
