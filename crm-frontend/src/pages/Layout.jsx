
import React, { useState, useEffect } from 'react';
import Funil from './Funil';
import NovoLeadModal from '../components/NovoLeadModal';
import SeletorFunil from '../components/SeletorFunil';

export default function Layout() {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [funilSelecionado, setFunilSelecionado] = useState('funil1');

  useEffect(() => {
    const salvo = localStorage.getItem('funilSelecionado');
    if (salvo) setFunilSelecionado(salvo);
  }, []);

  useEffect(() => {
    localStorage.setItem('funilSelecionado', funilSelecionado);
  }, [funilSelecionado]);

  const salvarNovoLead = (lead) => {
    const funilData = JSON.parse(localStorage.getItem(`funil_${funilSelecionado}`)) || {};
    const primeiraEtapa = Object.keys(funilData)[0];
    if (!primeiraEtapa) return alert('Nenhuma etapa encontrada no funil!');

    const novoLead = {
      id: Date.now().toString(),
      ...lead
    };

    const etapaAtualizada = {
      ...funilData[primeiraEtapa],
      items: [novoLead, ...funilData[primeiraEtapa].items]
    };

    const novoFunil = {
      ...funilData,
      [primeiraEtapa]: etapaAtualizada
    };

    localStorage.setItem(`funil_${funilSelecionado}`, JSON.stringify(novoFunil));
    window.location.reload();
  };

  const funisDisponiveis = Object.keys(localStorage)
    .filter((key) => key.startsWith('funil_'))
    .map((key) => key.replace('funil_', ''));

  return (
    <div className="flex flex-col h-screen">
      <div className="p-4 bg-white border-b flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold text-blue-600">Funil de Vendas</h1>
          <SeletorFunil
            funis={funisDisponiveis.length ? funisDisponiveis : ['funil1']}
            selecionado={funilSelecionado}
            onSelecionar={setFunilSelecionado}
          />
        </div>
        
      </div>

      <div className="flex-1">
        <Funil />
      </div>

      {mostrarModal && (
        <NovoLeadModal
          onClose={() => setMostrarModal(false)}
          onSalvar={salvarNovoLead}
        />
      )}
    </div>
  );
}
