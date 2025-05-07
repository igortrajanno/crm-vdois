import React from "react";
import { Link } from "react-router-dom";

export default function Configuracoes() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-blue-600">Configurações</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Integrações */}
        <Link
          to="/integracoes"
          className="bg-white p-6 rounded-lg shadow hover:shadow-md transition"
        >
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Integrações</h2>
          <p className="text-gray-500 text-sm">Gerencie suas integrações de API, WhatsApp, Instagram e outros canais.</p>
        </Link>

        {/* Automações */}
        <Link
          to="/automacoes"
          className="bg-white p-6 rounded-lg shadow hover:shadow-md transition"
        >
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Automações</h2>
          <p className="text-gray-500 text-sm">Configure automações de atendimento, mensagens automáticas e fluxos inteligentes.</p>
        </Link>

        {/* Funis e Fases do Negócio */}
        <Link
          to="/configuracoes/funil"
          className="bg-white p-6 rounded-lg shadow hover:shadow-md transition"
        >
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Funis e Fases do Negócio</h2>
          <p className="text-gray-500 text-sm">Crie, edite e gerencie seus funis de vendas e etapas de negociação.</p>
        </Link>

      </div>
    </div>
  );
}
