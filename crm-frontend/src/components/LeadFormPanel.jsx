import React, { useState, useEffect } from "react";

export default function LeadFormPanel({ lead, onCancel, onSave }) {
  const [form, setForm] = useState({
    nome: "",
    cargo: "",
    whatsapp: "",
    origem: "",
    empresa: { nome: "" },
  });

  useEffect(() => {
    if (lead) setForm(lead);
  }, [lead]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("empresa.")) {
      setForm((prev) => ({
        ...prev,
        empresa: {
          ...prev.empresa,
          [name.split(".")[1]]: value,
        },
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = () => {
    onSave(form);
  };

  return (
    <div className="fixed top-0 right-0 w-[360px] h-full bg-white shadow-lg z-50 flex flex-col">
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-semibold text-gray-700">Editar Lead</h2>
        <button onClick={onCancel} className="text-red-500 text-xl font-bold">✕</button>
      </div>

      <div className="p-4 flex-1 space-y-4 overflow-y-auto">
        <div>
          <label className="text-sm text-gray-500">Nome</label>
          <input name="nome" value={form.nome} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
        </div>

        <div>
          <label className="text-sm text-gray-500">WhatsApp</label>
          <input name="whatsapp" value={form.whatsapp} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
        </div>

        <div>
          <label className="text-sm text-gray-500">Cargo</label>
          <input name="cargo" value={form.cargo} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
        </div>

        <div>
          <label className="text-sm text-gray-500">Origem</label>
          <input name="origem" value={form.origem} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
        </div>

        <div>
          <label className="text-sm text-gray-500">Empresa</label>
          <input name="empresa.nome" value={form.empresa?.nome || ""} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
        </div>
      </div>

      <div className="p-4 space-y-2">
        <button onClick={handleSubmit} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          💾 Salvar alterações
        </button>
        <button onClick={onCancel} className="w-full py-2 border border-gray-300 rounded text-gray-600">
          Cancelar
        </button>
      </div>
    </div>
  );
}