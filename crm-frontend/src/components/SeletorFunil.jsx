
import React from "react";

export default function SeletorFunil({ funis, selecionado, onSelecionar }) {
  const nomesFunis = funis && typeof funis === "object" && !Array.isArray(funis)
    ? Object.keys(funis)
    : [];

  return (
    <select
      className="border rounded px-3 py-1"
      value={selecionado}
      onChange={(e) => onSelecionar(e.target.value)}
    >
      {nomesFunis.length > 0 ? (
        nomesFunis.map((nome) => (
          <option key={nome} value={nome}>
            {nome}
          </option>
        ))
      ) : (
        <option disabled>Nenhum funil encontrado</option>
      )}
    </select>
  );
}
