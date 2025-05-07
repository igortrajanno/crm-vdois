import React, { useState } from "react";

export default function LeadForm({ lead = {}, onChange }) {
  const [responsaveis, setResponsaveis] = useState(lead.responsaveis || [{}]);
  const [mostrarEmpresa, setMostrarEmpresa] = useState(!!lead.empresa);

  const atualizarResponsavel = (index, campo, valor) => {
    const novosResponsaveis = [...responsaveis];
    novosResponsaveis[index] = { ...novosResponsaveis[index], [campo]: valor };
    setResponsaveis(novosResponsaveis);
    onChange({ ...lead, responsaveis: novosResponsaveis, empresa: mostrarEmpresa ? lead.empresa : undefined });
  };

  const adicionarResponsavel = () => {
    const novosResponsaveis = [...responsaveis, {}];
    setResponsaveis(novosResponsaveis);
    onChange({ ...lead, responsaveis: novosResponsaveis });
  };

  const atualizarEmpresa = (campo, valor) => {
    const novaEmpresa = { ...lead.empresa, [campo]: valor };
    onChange({ ...lead, empresa: novaEmpresa });
  };

  return (
    <form className="space-y-6">
      {responsaveis.map((responsavel, index) => (
        <div key={index} className="p-4 border rounded-lg bg-gray-50">
          <h3 className="font-semibold mb-2">Contato {index + 1}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Nome" className="input" value={responsavel.nome || ""} onChange={(e) => atualizarResponsavel(index, "nome", e.target.value)} />
            <input type="text" placeholder="Cargo" className="input" value={responsavel.cargo || ""} onChange={(e) => atualizarResponsavel(index, "cargo", e.target.value)} />
            <input type="text" placeholder="Telefone" className="input" value={responsavel.telefone || ""} onChange={(e) => atualizarResponsavel(index, "telefone", e.target.value)} />
            <input type="text" placeholder="WhatsApp" className="input" value={responsavel.whatsapp || ""} onChange={(e) => atualizarResponsavel(index, "whatsapp", e.target.value)} />
            <input type="email" placeholder="E-mail" className="input" value={responsavel.email || ""} onChange={(e) => atualizarResponsavel(index, "email", e.target.value)} />
            <input type="text" placeholder="Origem" className="input" value={responsavel.origem || ""} onChange={(e) => atualizarResponsavel(index, "origem", e.target.value)} />
            <input type="text" placeholder="Rede Social" className="input" value={responsavel.redeSocial || ""} onChange={(e) => atualizarResponsavel(index, "redeSocial", e.target.value)} />
            <textarea placeholder="Observações" className="input" value={responsavel.observacoes || ""} onChange={(e) => atualizarResponsavel(index, "observacoes", e.target.value)} />
          </div>
        </div>
      ))}
      <button type="button" onClick={adicionarResponsavel} className="btn btn-outline mt-2">+ Adicionar contato</button>

      <div className="mt-4">
        <button type="button" onClick={() => setMostrarEmpresa(!mostrarEmpresa)} className="btn btn-light">
          {mostrarEmpresa ? "Ocultar informações empresariais" : "+ Adicionar informações empresariais"}
        </button>
      </div>

      {mostrarEmpresa && (
        <div className="p-4 border rounded-lg bg-gray-50 mt-4">
          <h3 className="font-semibold mb-2">Informações da Empresa</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Nome da empresa" className="input" value={lead.empresa?.nome || ""} onChange={(e) => atualizarEmpresa("nome", e.target.value)} />
            <input type="text" placeholder="CNPJ (opcional)" className="input" value={lead.empresa?.cnpj || ""} onChange={(e) => atualizarEmpresa("cnpj", e.target.value)} />
            <input type="text" placeholder="Segmento" className="input" value={lead.empresa?.segmento || ""} onChange={(e) => atualizarEmpresa("segmento", e.target.value)} />
            <input type="text" placeholder="Cidade" className="input" value={lead.empresa?.cidade || ""} onChange={(e) => atualizarEmpresa("cidade", e.target.value)} />
            <input type="text" placeholder="Estado" className="input" value={lead.empresa?.estado || ""} onChange={(e) => atualizarEmpresa("estado", e.target.value)} />
            <input type="text" placeholder="Website" className="input" value={lead.empresa?.website || ""} onChange={(e) => atualizarEmpresa("website", e.target.value)} />
            <input type="text" placeholder="Telefone da empresa" className="input" value={lead.empresa?.telefone || ""} onChange={(e) => atualizarEmpresa("telefone", e.target.value)} />
            <input type="email" placeholder="Email da empresa" className="input" value={lead.empresa?.email || ""} onChange={(e) => atualizarEmpresa("email", e.target.value)} />
            <input type="text" placeholder="Rede Social da empresa" className="input" value={lead.empresa?.redeSocial || ""} onChange={(e) => atualizarEmpresa("redeSocial", e.target.value)} />
          </div>
        </div>
      )}
    </form>
  );
}