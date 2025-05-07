
import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import Papa from 'papaparse';

const CAMPOS_PADRAO = ['Ignorar', 'nome', 'telefone', 'responsavel', 'origem', 'Criar novo campo'];

export default function ImportarLeads() {
  const [arquivo, setArquivo] = useState(null);
  const [headers, setHeaders] = useState([]);
  const [mapeamento, setMapeamento] = useState({});
  const [novosCampos, setNovosCampos] = useState({});
  const [etapa, setEtapa] = useState('entrada');

  const handleArquivo = (e) => {
    const file = e.target.files[0];
    setArquivo(file);

    const extensao = file.name.split('.').pop().toLowerCase();

    if (extensao === 'csv') {
      Papa.parse(file, {
        complete: (result) => {
          const cabecalhos = result.data[0];
          console.log('Arquivo carregado:', file.name);
          console.log('Cabeçalhos encontrados:', cabecalhos);
          setHeaders(cabecalhos);
          setMapeamento(Object.fromEntries(cabecalhos.map((h) => [h, 'Ignorar'])));
        },
        error: (err) => {
          console.error('Erro ao ler CSV:', err);
        }
      });
    } else {
      const reader = new FileReader();
      reader.onload = (evt) => {
        const data = new Uint8Array(evt.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const json = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        const cabecalhos = json[0];
        console.log('Arquivo carregado:', file.name);
        console.log('Cabeçalhos encontrados:', cabecalhos);
        setHeaders(cabecalhos);
        setMapeamento(Object.fromEntries(cabecalhos.map((h) => [h, 'Ignorar'])));
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleMapeamentoChange = (coluna, valor) => {
    const novo = { ...mapeamento, [coluna]: valor };
    setMapeamento(novo);
  };

  const handleNovoCampo = (coluna, valor) => {
    setNovosCampos({ ...novosCampos, [coluna]: valor });
  };

  const importarDados = () => {
    if (!arquivo) return;

    const extensao = arquivo.name.split('.').pop().toLowerCase();

    if (extensao === 'csv') {
      Papa.parse(arquivo, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          processarLeads(results.data);
        },
        error: (err) => {
          console.error('Erro ao importar CSV:', err);
        }
      });
    } else {
      const reader2 = new FileReader();
      reader2.onload = (evt) => {
        const data = new Uint8Array(evt.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const json = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        const dados = json.slice(1).filter((row) => row.length > 0);
        const cabecalhos = json[0];
        const leads = dados.map((linha) => {
          const lead = { etapa, fechado: false };
          cabecalhos.forEach((coluna, idx) => {
            const campoSelecionado = mapeamento[coluna];
            if (campoSelecionado === 'Criar novo campo') {
              const nomeCampo = novosCampos[coluna];
              if (nomeCampo) lead[nomeCampo] = linha[idx];
            } else if (campoSelecionado !== 'Ignorar') {
              lead[campoSelecionado] = linha[idx];
            }
          });
          lead.id = String(Date.now() + Math.random());
          return lead;
        });

        salvarLeads(leads);
      };
      reader2.readAsArrayBuffer(arquivo);
    }
  };

  const salvarLeads = (leads) => {
    const chave = 'funil_funil1';
    const funilAtual = JSON.parse(localStorage.getItem(chave)) || {
      entrada: { titulo: 'Leads de Entrada', items: [] },
      qualificar: { titulo: 'Qualificar', items: [] },
      proposta: { titulo: 'Proposta', items: [] },
      fechado: { titulo: 'Fechado', items: [] }
    };

    funilAtual[etapa].items.push(...leads);
    localStorage.setItem(chave, JSON.stringify(funilAtual));
    alert('Leads importados com sucesso!');
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-blue-700 mb-4">📥 Importar Leads com Mapeamento</h1>

      <div className="bg-white shadow rounded p-6">
        <label className="block text-sm mb-1">Etapa de destino:</label>
        <select value={etapa} onChange={(e) => setEtapa(e.target.value)} className="mb-4 p-2 border rounded">
          <option value="entrada">Leads de Entrada</option>
          <option value="qualificar">Qualificar</option>
          <option value="proposta">Proposta</option>
          <option value="fechado">Fechado</option>
        </select>

        <input type="file" accept=".csv,.xlsx" onChange={handleArquivo} className="mb-4" />

        {headers.length > 0 && (
          <div className="mt-4">
            <h2 className="font-semibold mb-2">Mapeie as colunas da planilha:</h2>
            <table className="text-sm w-full border">
              <thead>
                <tr>
                  <th className="border p-2 bg-gray-100 text-left">Coluna da Planilha</th>
                  <th className="border p-2 bg-gray-100 text-left">Importar como</th>
                  <th className="border p-2 bg-gray-100 text-left">Novo campo (se aplicável)</th>
                </tr>
              </thead>
              <tbody>
                {headers.map((coluna, idx) => (
                  <tr key={idx}>
                    <td className="border p-2">{coluna}</td>
                    <td className="border p-2">
                      <select
                        value={mapeamento[coluna]}
                        onChange={(e) => handleMapeamentoChange(coluna, e.target.value)}
                        className="p-1 border rounded"
                      >
                        {CAMPOS_PADRAO.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </td>
                    <td className="border p-2">
                      {mapeamento[coluna] === 'Criar novo campo' && (
                        <input
                          type="text"
                          placeholder="Ex: cidade"
                          className="p-1 border rounded w-full"
                          value={novosCampos[coluna] || ''}
                          onChange={(e) => handleNovoCampo(coluna, e.target.value)}
                        />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button
              className="mt-6 bg-blue-600 text-white px-4 py-2 rounded"
              onClick={importarDados}
            >
              Importar Leads
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
