
import React from "react";
import SeletorFunil from "./SeletorFunil";

export default function FunilHeader({ funilSelecionado, onSelecionar, leads, onNovoLead, funis }) {
  const total = leads.length;
  const valorNegociado = leads.length * 1000; // mock valor

  return (
    <div className="bg-white shadow p-4 flex justify-between items-center sticky top-0 z-10">
      <div className="flex gap-4 items-center">
        <SeletorFunil
          funis={funis}
          selecionado={funilSelecionado}
          onSelecionar={onSelecionar}
        />
      </div>

      <div className="flex gap-6 items-center">
        <div><strong>Leads:</strong> {total}</div>
        <div><strong>Negociação:</strong> R$ {valorNegociado.toLocaleString()}</div>
        <button onClick={onNovoLead} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          + Novo Lead
        </button>
      </div>
    </div>
  );
}
