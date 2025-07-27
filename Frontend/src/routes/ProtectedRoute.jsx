// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children }) => {
//   const token = localStorage.getItem("token");

//   if (!token) {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getUserProfile } from "../services/authService";

const ProtectedRoute = ({ children }) => {
  const [authorized, setAuthorized] = useState(null);

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const user = await getUserProfile();
        if (user.role === "user") {
          setAuthorized(true); 
        } else {
          setAuthorized(false); // block admin
        }
      } catch {
        setAuthorized(false);
      }
    };
    checkAccess();
  }, []);

  if (authorized === null) return <div>Loading...</div>;
  if (!authorized) return <Navigate to="/unauthorized" />;
};

export default ProtectedRoute;

