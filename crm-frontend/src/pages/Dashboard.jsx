import React from "react";
import dashboardData from '../data/mockDashboardData'
import { PieChart, Pie, Cell, Tooltip } from 'recharts'

const COLORS = ['#2563EB', '#93C5FD']

export default function Dashboard() {
  const {
    mensagensRecebidas,
    conversasAtivas,
    tempoResposta,
    leads,
    tarefas,
    fontesLead
  } = dashboardData

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-blue-800">vdoisagencia</h1>

      {/* Filtros simulados */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button className="bg-gray-200 px-4 py-1 rounded-full text-sm">Hoje</button>
        <button className="bg-gray-200 px-4 py-1 rounded-full text-sm">Semana</button>
        <button className="bg-gray-200 px-4 py-1 rounded-full text-sm">Mês</button>
        <button className="bg-gray-200 px-4 py-1 rounded-full text-sm">Período ▾</button>
        <button className="bg-gray-200 px-4 py-1 rounded-full text-sm">Selecionar usuário ▾</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* Mensagens Recebidas */}
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <p className="text-sm text-gray-600 mb-1">MENSAGENS RECEBIDAS</p>
          <h2 className="text-2xl font-bold text-green-600">{mensagensRecebidas}</h2>
          <div className="mt-2 text-sm text-gray-500">
            <div className="flex justify-between">
              <span>WhatsApp Cloud API</span>
              <span>100%</span>
            </div>
            <div className="w-full bg-gray-200 h-1 rounded mt-1 mb-3">
              <div className="bg-green-500 h-1 rounded" style={{ width: '100%' }}></div>
            </div>
            <p>Bate papo online</p>
            <p>Outros</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm flex flex-col justify-center items-start">
          <p className="text-sm text-gray-600">CONVERSAS ATIVAS</p>
          <h2 className="text-2xl font-bold">{conversasAtivas}</h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm flex flex-col justify-center items-start">
          <p className="text-sm text-gray-600">TEMPO DE RESPOSTA</p>
          <h2 className="text-2xl font-bold text-green-600">{tempoResposta}s</h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm">
          <p className="text-sm text-gray-600 mb-2">FONTE DE LEADS</p>
          <PieChart width={200} height={200}>
            <Pie
              data={fontesLead}
              cx="50%"
              cy="50%"
              outerRadius={60}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {fontesLead.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

        {/* Segunda linha */}
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <p className="text-sm text-gray-600">LEADS GANHOS</p>
          <h2 className="text-xl font-bold">{leads.ganhos} <span className="text-sm">R$</span></h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm">
          <p className="text-sm text-gray-600">LEADS ATIVOS</p>
          <h2 className="text-xl font-bold">{leads.ativos}</h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm">
          <p className="text-sm text-gray-600">LEADS SEM TAREFAS</p>
          <h2 className="text-xl font-bold">{leads.semTarefas}</h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm">
          <p className="text-sm text-gray-600 mb-2">TAREFAS PENDENTES</p>
          <p className="text-sm text-gray-700">Iniciar contato</p>
          <h2 className="text-xl font-bold">{tarefas.iniciarContato} tarefas</h2>
        </div>
      </div>
    </div>
  )
}
