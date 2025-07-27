// src/components/PrivateRouteAdmin.jsx
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserProfile } from "../services/authService";

const PrivateRouteAdmin = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const data = await getUserProfile();
        if (data.role === "admin") {
          setIsAdmin(true);
        }
      } catch (error) {
        console.error("Unauthorized or no token");
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  if (loading) return <div>Loading...</div>;

  return isAdmin ? children : <Navigate to="/login" />;
};

export default PrivateRouteAdmin;
