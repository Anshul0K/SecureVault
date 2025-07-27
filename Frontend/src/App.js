import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TestApi from "./pages/TestApi";
import ProtectedTest from "./pages/ProtectedTest";
import Login from "./pages/Login"; 
import UserDashboard from "./pages/user/UserDashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import PrivateRouteAdmin from "./routes/PrivateRouteAdmin";
import Help from "./pages/Help";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<div style={{ fontSize: "24px", textAlign: "center" }}>🏠 Home Page</div>} />
        <Route path="/test" element={<TestApi />} />
        <Route path="/protected" element={<ProtectedTest />} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/user" element={<UserDashboard />} />
        <Route path="/help" element={<Help />} /> 
        <Route path="/admin" element={<PrivateRouteAdmin><AdminDashboard /></PrivateRouteAdmin>}/>
      </Routes>
    </Router>
  );
}

export default App;
