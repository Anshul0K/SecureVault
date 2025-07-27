

import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getUserProfile } from "../services/authService";

const ProtectedRoute = ({ children }) => {
  const [authorized, setAuthorized] = useState(null);

  useEffect(() => {
    const checkAccess = async () => {
      console.log("🔐 ProtectedRoute mounted. Checking user access...");

      try {
        const user = await getUserProfile();
        console.log("✅ User fetched in ProtectedRoute:", user);

        if (user?.role === "user") {
          console.log("🟢 User has 'user' role. Access granted.");
          setAuthorized(true);
        } else {
          console.warn("🔴 User role is not 'user'. Access denied.");
          setAuthorized(false);
        }

      } catch (err) {
        console.error("❌ Error while fetching user profile in ProtectedRoute:", err);
        setAuthorized(false);
      }
    };

    checkAccess();
  }, []);

  console.log("yes i am here ");
  if (authorized === null) {
    console.log("⏳ Authorization check in progress...");
    return <div>Loading...</div>;
  }

  if (!authorized) {
    console.warn("🚫 Unauthorized access. Redirecting to /unauthorized");
    return <Navigate to="/unauthorized" />;
  }

  console.log("✅ ProtectedRoute check complete. Rendering children...");
  return children;
};

export default ProtectedRoute;
