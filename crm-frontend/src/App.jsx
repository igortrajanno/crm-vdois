import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Funil from "./pages/Funil";
import Configuracoes from "./pages/Configuracoes";
import ConfigFunis from "./pages/ConfigFunis";
import Login from "./pages/Login";
import Logout from "./pages/Logout";

export default function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path="/funil" element={<PrivateRoute><Funil /></PrivateRoute>} />
            <Route path="/configuracoes" element={<PrivateRoute><Configuracoes /></PrivateRoute>} />
            <Route path="/configuracoes/funil" element={<PrivateRoute><ConfigFunis /></PrivateRoute>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}