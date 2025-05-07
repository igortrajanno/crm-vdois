
import React, { useState } from "react";
import FunilHeader from "../components/FunilHeader";
import KanbanBoard from "../components/KanbanBoard";
import NovoLeadPanel from "../components/NovoLeadPanel";
import LeadPanel from "../components/LeadPanel";
import LeadFormPanel from "../components/LeadFormPanel";
import { useFunis } from "../hooks/useFunis";

export default function Funil() {
  const { funis } = useFunis();
  const nomesFunis = Object.keys(funis);
  const [funilSelecionado, setFunilSelecionado] = useState(nomesFunis[0] || "");
  const [leads, setLeads] = useState(mockLeads);
  const [novoLeadAberto, setNovoLeadAberto] = useState(false);
  const [leadSelecionado, setLeadSelecionado] = useState(null);
  const [editando, setEditando] = useState(false);

  const abrirNovoLead = () => setNovoLeadAberto(true);
  const fecharNovoLead = () => setNovoLeadAberto(false);

  const salvarNovoLead = (novoLead) => {
    setLeads((prev) => [...prev, novoLead]);
    fecharNovoLead();
  };

  const abrirPainelLead = (lead) => {
    setLeadSelecionado(lead);
    setEditando(false);
  };

  const fecharPainelLead = () => {
    setLeadSelecionado(null);
    setEditando(false);
  };

  const atualizarLead = (dadosAtualizados) => {
    setLeads((prev) =>
      prev.map((lead) =>
        lead.id === leadSelecionado.id ? { ...lead, ...dadosAtualizados } : lead
      )
    );
    fecharPainelLead();
  };

  const excluirLead = () => {
    if (window.confirm("Tem certeza que deseja excluir este lead?")) {
      setLeads((prev) => prev.filter((l) => l.id !== leadSelecionado.id));
      fecharPainelLead();
    }
  };

  return (
    <div className="p-4 space-y-4">
      <FunilHeader
        funilSelecionado={funilSelecionado}
        onSelecionar={setFunilSelecionado}
        leads={leads}
        onNovoLead={abrirNovoLead}
        funis={nomesFunis}
      />
      <KanbanBoard
        leads={leads}
        setLeads={setLeads}
        onSelectLead={abrirPainelLead}
        etapas={funis[funilSelecionado] || []}
      />
      {novoLeadAberto && (
        <NovoLeadPanel onCancel={fecharNovoLead} onSave={salvarNovoLead} />
      )}
      {leadSelecionado && !editando && (
        <LeadPanel
          lead={leadSelecionado}
          onClose={fecharPainelLead}
          onEdit={() => setEditando(true)}
          onDelete={excluirLead}
        />
      )}
      {leadSelecionado && editando && (
        <LeadFormPanel
          lead={leadSelecionado}
          onCancel={fecharPainelLead}
          onSave={atualizarLead}
        />
      )}
    </div>
  );
}

const mockLeads = [
  { id: "1", nome: "João Silva", cargo: "CEO", etapa: "Novo", whatsapp: "5511999999999" },
  { id: "2", nome: "Maria Oliveira", cargo: "Marketing", etapa: "Apresentação" },
  { id: "3", nome: "Lucas Souza", cargo: "Comercial", etapa: "❌ Perdido" },
];
