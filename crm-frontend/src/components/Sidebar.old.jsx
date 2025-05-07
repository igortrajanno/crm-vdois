
import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside style={{ width: "220px", background: "#f9fafb", padding: "1rem", height: "100vh", borderRight: "1px solid #e5e7eb" }}>
      <h2 style={{ marginBottom: "2rem", fontWeight: "bold", color: "#2563eb" }}>CRM VDOIS</h2>
      <nav>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li style={{ marginBottom: "1rem" }}>
            <Link to="/" style={{ textDecoration: "none", color: "#111827" }}>Dashboard</Link>
          </li>
          <li style={{ marginBottom: "1rem" }}>
            <Link to="/funil" style={{ textDecoration: "none", color: "#111827" }}>Funil</Link>
          </li>
          <li style={{ marginBottom: "1rem" }}>
            <Link to="/conversas" style={{ textDecoration: "none", color: "#111827" }}>Conversas</Link>
          </li>
          <li style={{ marginBottom: "1rem" }}>
            <Link to="/importar-leads" style={{ textDecoration: "none", color: "#111827" }}>Importar Leads</Link>
          </li>
          <li style={{ marginBottom: "1rem" }}>
            <Link to="/configuracoes" style={{ textDecoration: "none", color: "#111827" }}>Configurações</Link>
          </li>
          <li style={{ marginTop: "2rem" }}>
            <Link to="/sair" style={{ textDecoration: "none", color: "red" }}>⎋ Sair</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
