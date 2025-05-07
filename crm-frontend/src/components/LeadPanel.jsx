import React from "react";

export default function LeadPanel({ lead, onClose, onEdit, onDelete }) {
  if (!lead) return null;

  const { nome, cargo, whatsapp, origem, empresa = {} } = lead;

  const initials = nome
    ? nome.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase()
    : "--";

  return (
    <div className="fixed top-0 right-0 w-[360px] h-full bg-white shadow-lg z-50 flex flex-col">
      <div className="flex justify-between items-center p-4 border-b">
        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-xl font-semibold text-gray-700">
          {initials}
        </div>
        <button onClick={onClose} className="text-purple-600 text-xl font-bold">✕</button>
      </div>

      <div className="p-4 flex-1 space-y-3">
        <div className="text-center">
          <h2 className="text-lg font-semibold">{nome}</h2>
          {whatsapp && (
            <a
              href={"https://wa.me/" + whatsapp}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 text-sm block"
            >
              +{whatsapp}
            </a>
          )}
          <p className="text-sm text-gray-500 italic">{cargo}</p>
        </div>

        <hr />

        <div>
          <p><strong>Origem:</strong> {origem || "Não informada"}</p>
          <p><strong>Empresa:</strong> {empresa.nome || "—"}</p>
        </div>

        <hr />

        <button
          onClick={onEdit}
          className="w-full bg-blue-600 text-white py-2 rounded flex items-center justify-center gap-2 hover:bg-blue-700"
        >
          ✏️ Editar
        </button>

        <button
          onClick={onDelete}
          className="w-full bg-red-600 text-white py-2 rounded flex items-center justify-center gap-2 hover:bg-red-700"
        >
          🗑️ Excluir lead
        </button>
      </div>
    </div>
  );
}