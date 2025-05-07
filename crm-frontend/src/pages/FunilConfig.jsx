
import React, { useState, useEffect } from "react";

export default function FunilConfig() {
  const [funis, setFunis] = useState([]);
  const [novoFunil, setNovoFunil] = useState("");

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem("funis") || "[]");
    setFunis(local);
  }, []);

  const salvarLocal = (lista) => {
    setFunis(lista);
    localStorage.setItem("funis", JSON.stringify(lista));
  };

  const adicionarFunil = () => {
    if (!novoFunil.trim()) return;
    const novo = [...funis, { nome: novoFunil.trim(), fases: [], inputFase: "" }];
    salvarLocal(novo);
    setNovoFunil("");
  };

  const adicionarFase = (index) => {
    const atual = [...funis];
    if (!atual[index].inputFase.trim()) return;
    atual[index].fases.push(atual[index].inputFase.trim());
    atual[index].inputFase = "";
    salvarLocal(atual);
  };

  const editarFase = (funilIdx, faseIdx, novoTexto) => {
    const atual = [...funis];
    atual[funilIdx].fases[faseIdx] = novoTexto;
    salvarLocal(atual);
  };

  const deletarFase = (funilIdx, faseIdx) => {
    const atual = [...funis];
    atual[funilIdx].fases.splice(faseIdx, 1);
    salvarLocal(atual);
  };

  const moverFase = (funilIdx, faseIdx, direcao) => {
    const atual = [...funis];
    const fases = atual[funilIdx].fases;
    const novaPos = faseIdx + direcao;
    if (novaPos < 0 || novaPos >= fases.length) return;
    [fases[faseIdx], fases[novaPos]] = [fases[novaPos], fases[faseIdx]];
    salvarLocal(atual);
  };

  return (
    <div style={{ maxWidth: "800px", margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h2 style={{ color: "#2563eb" }}>Funis e Fases do Negócio</h2>

      <div>
        <input
          placeholder="Nome do Funil"
          value={novoFunil}
          onChange={e => setNovoFunil(e.target.value)}
          style={{ width: "100%", padding: "0.5rem", marginBottom: "0.5rem" }}
        />
        <button onClick={adicionarFunil} style={{ background: "#2563eb", color: "#fff", padding: "0.5rem 1rem", border: "none" }}>
          Adicionar Funil
        </button>
      </div>

      <h3 style={{ marginTop: "2rem" }}>Funis existentes</h3>

      {funis.map((funil, i) => (
        <div key={i} style={{ background: "#f9f9f9", padding: "1rem", marginTop: "1rem", borderRadius: "6px" }}>
          <strong>{funil.nome}</strong>

          <div style={{ marginTop: "1rem" }}>
            {funil.fases.map((fase, j) => (
              <div key={j} style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                <input
                  value={fase}
                  onChange={e => editarFase(i, j, e.target.value)}
                  style={{ flex: 1, padding: "0.3rem" }}
                />
                <button onClick={() => moverFase(i, j, -1)}>⬆</button>
                <button onClick={() => moverFase(i, j, 1)}>⬇</button>
                <button onClick={() => deletarFase(i, j)} style={{ color: "#ef4444", border: "none", background: "transparent" }}>
                  ❌
                </button>
              </div>
            ))}

            <div>
              <input
                placeholder="Nova fase"
                value={funil.inputFase || ""}
                onChange={e => {
                  const atual = [...funis];
                  atual[i].inputFase = e.target.value;
                  setFunis(atual);
                }}
                style={{ width: "100%", padding: "0.5rem", marginTop: "0.5rem" }}
              />
              <button onClick={() => adicionarFase(i)} style={{ background: "#22c55e", color: "#fff", padding: "0.5rem 1rem", marginTop: "0.5rem" }}>
                Salvar Fase
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
