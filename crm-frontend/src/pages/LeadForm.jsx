
import React, { useState } from 'react';

export default function LeadForm({ onSalvar, onClose }) {
  const [lead, setLead] = useState({
    nome: '',
    telefone: '',
    etapa: '',
  });

  const etapas = ['Novo', 'Em contato', 'Proposta', 'Fechado'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLead((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSalvar(lead);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Nome</label>
        <input
          type="text"
          name="nome"
          value={lead.nome}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Telefone</label>
        <input
          type="text"
          name="telefone"
          value={lead.telefone}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Etapa</label>
        <select
          name="etapa"
          value={lead.etapa}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="">Selecione uma etapa</option>
          {etapas.map((etapa) => (
            <option key={etapa} value={etapa}>
              {etapa}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-end gap-2">
        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
          Cancelar
        </button>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
          Salvar
        </button>
      </div>
    </form>
  );
}
