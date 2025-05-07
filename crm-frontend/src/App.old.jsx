import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Funil from "./pages/Funil";
import ImportarLeads from "./pages/ImportarLeads";
import Configuracoes from "./pages/Configuracoes";
import Integracoes from "./pages/Integracoes";
import Automacoes from "./pages/Automacoes";
import Conversas from "./pages/Conversas";
import FunilConfig from "./pages/FunilConfig";
import Login from "./pages/Login";

function PrivateRoute({ children }) {
  const isAuthenticated = localStorage.getItem("auth") === "true";
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function Layout() {
  const location = useLocation();
  const hideSidebar = location.pathname === "/login";

  return (
    <div className="flex">
      {!hideSidebar && <Sidebar />}
      <div className="flex-1 p-6 bg-gray-100 min-h-screen overflow-y-auto">
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/funil"
            element={
              <PrivateRoute>
                <Funil />
              </PrivateRoute>
            }
          />
          <Route
            path="/importar"
            element={
              <PrivateRoute>
                <ImportarLeads />
              </PrivateRoute>
            }
          />
          <Route
            path="/configuracoes"
            element={
              <PrivateRoute>
                <Configuracoes />
              </PrivateRoute>
            }
          />
          <Route
            path="/configuracoes/funil"
            element={
              <PrivateRoute>
                <FunilConfig />
              </PrivateRoute>
            }
          />
          <Route
            path="/integracoes"
            element={
              <PrivateRoute>
                <Integracoes />
              </PrivateRoute>
            }
          />
          <Route
            path="/automacoes"
            element={
              <PrivateRoute>
                <Automacoes />
              </PrivateRoute>
            }
          />
          <Route
            path="/conversas"
            element={
              <PrivateRoute>
                <Conversas />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}
