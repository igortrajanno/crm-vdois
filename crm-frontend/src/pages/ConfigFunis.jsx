import React, { useState } from "react";
import { useFunis } from "../hooks/useFunis";

export default function ConfigFunis() {
  const { funis, addFunil, addFase, deleteFase } = useFunis();
  const [novoFunil, setNovoFunil] = useState("");
  const [novasFases, setNovasFases] = useState({});

  const handleAddFunil = () => {
    if (novoFunil.trim()) {
      addFunil(novoFunil.trim());
      setNovoFunil("");
    }
  };

  const handleAddFase = (funil) => {
    const nova = (novasFases[funil] || "").trim();
    if (nova) {
      addFase(funil, nova);
      setNovasFases((prev) => ({ ...prev, [funil]: "" }));
    }
  };

  const handleRemoveFase = (funil, fase) => {
    if (!fase.includes("Ganho") && !fase.includes("Perdido")) {
      deleteFase(funil, fase);
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-lg font-semibold mb-4 text-blue-700">Funis e Fases do Negócio</h2>
      <div className="flex gap-2 mb-4">
        <input
          value={novoFunil}
          onChange={(e) => setNovoFunil(e.target.value)}
          placeholder="Nome do Funil"
          className="border px-3 py-1 rounded w-full"
        />
        <button onClick={handleAddFunil} className="bg-blue-600 text-white px-4 py-1 rounded">
          Adicionar Funil
        </button>
      </div>

      {Object.keys(funis).map((nome) => (
        <div key={nome} className="bg-gray-50 rounded shadow p-4 mb-6">
          <h3 className="font-semibold mb-2">{nome}</h3>
          {funis[nome].map((fase) => (
            <div key={fase} className="flex items-center gap-2 mb-1">
              <input
                className="border w-full px-2 py-1 rounded"
                value={fase}
                disabled
              />
              {!fase.includes("Ganho") && !fase.includes("Perdido") && (
                <button onClick={() => handleRemoveFase(nome, fase)} className="text-red-500 font-bold">✖</button>
              )}
            </div>
          ))}
          <div className="flex gap-2 mt-2">
            <input
              placeholder="Nova fase"
              value={novasFases[nome] || ""}
              onChange={(e) =>
                setNovasFases((prev) => ({ ...prev, [nome]: e.target.value }))
              }
              className="border px-3 py-1 rounded w-full"
            />
            <button
              onClick={() => handleAddFase(nome)}
              className="bg-green-600 text-white px-4 py-1 rounded"
            >
              Salvar Fase
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}