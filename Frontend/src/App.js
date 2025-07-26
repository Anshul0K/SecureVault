import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TestApi from "./pages/TestApi";
import ProtectedTest from "./pages/ProtectedTest";
import Login from "./pages/Login"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<div style={{ fontSize: "24px", textAlign: "center" }}>🏠 Home Page</div>} />
        <Route path="/test" element={<TestApi />} />
        <Route path="/protected" element={<ProtectedTest />} />
        <Route path="/login" element={<Login />} /> 

      </Routes>
    </Router>
  );
}

export default App;
