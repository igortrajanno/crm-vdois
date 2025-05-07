
import React, { useEffect, useState } from "react";

export default function Integracoes() {
  const [instancias, setInstancias] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [novaUrl, setNovaUrl] = useState("");
  const [novaInstancia, setNovaInstancia] = useState("");
  const [novoToken, setNovoToken] = useState("");
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem("listaInstancias");
      const salvas = JSON.parse(raw || "[]");
      if (Array.isArray(salvas)) {
        setInstancias(salvas);
      } else {
        setInstancias([]);
      }
    } catch (e) {
      console.error("Erro ao carregar instâncias salvas:", e);
      setInstancias([]);
    }
  }, []);

  useEffect(() => {
    instancias.forEach((inst, i) => {
      fetch(inst.url.replace(/\/$/, "") + "/instance/info/" + inst.nomeInstancia, {
        headers: {
          "Content-Type": "application/json",
          "apikey": inst.token
        }
      })
        .then(res => res.json())
        .then(data => {
          const atualizadas = [...instancias];
          atualizadas[i].info = data;
          setInstancias([...atualizadas]);
        })
        .catch(() => {});
    });
  }, [instancias.length]);

  const salvarNova = () => {
    if (!novaUrl || !novaInstancia || !novoToken) {
      setMensagem("Preencha todos os campos.");
      return;
    }
    const nova = {
      url: novaUrl,
      nomeInstancia: novaInstancia,
      token: novoToken
    };
    const atualizadas = [...instancias, nova];
    localStorage.setItem("listaInstancias", JSON.stringify(atualizadas));
    setInstancias(atualizadas);
    setNovaUrl("");
    setNovaInstancia("");
    setNovoToken("");
    setShowForm(false);
    setMensagem("Instância adicionada com sucesso.");
  };

  const deletar = (i) => {
    const atualizadas = [...instancias];
    atualizadas.splice(i, 1);
    localStorage.setItem("listaInstancias", JSON.stringify(atualizadas));
    setInstancias(atualizadas);
  };

  return (
    <div style={{ maxWidth: "900px", margin: "2rem auto", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
        <h2>Integrações</h2>
        <button onClick={() => setShowForm(!showForm)} style={{ padding: "0.5rem 1rem", background: "#2563eb", color: "#fff", border: "none", borderRadius: "4px" }}>
          + Nova Conexão
        </button>
      </div>

      {showForm && (
        <div style={{ marginBottom: "2rem", background: "#f9f9f9", padding: "1rem", borderRadius: "8px" }}>
          <h4>Nova Instância</h4>
          <input type="text" placeholder="URL da API" value={novaUrl} onChange={e => setNovaUrl(e.target.value)} style={{ width: "100%", marginBottom: "0.5rem", padding: "0.5rem" }} />
          <input type="text" placeholder="Nome da Instância" value={novaInstancia} onChange={e => setNovaInstancia(e.target.value)} style={{ width: "100%", marginBottom: "0.5rem", padding: "0.5rem" }} />
          <input type="text" placeholder="Token" value={novoToken} onChange={e => setNovoToken(e.target.value)} style={{ width: "100%", marginBottom: "0.5rem", padding: "0.5rem" }} />
          <button onClick={salvarNova} style={{ padding: "0.5rem 1rem", background: "#22c55e", color: "#fff", border: "none", borderRadius: "4px" }}>
            Salvar
          </button>
          {mensagem && <p style={{ marginTop: "0.5rem", color: "green" }}>{mensagem}</p>}
        </div>
      )}

      <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}>
        {Array.isArray(instancias) && instancias.map((inst, i) => (
          <div key={i} style={{ background: "#0f172a", color: "#fff", padding: "1rem", borderRadius: "8px" }}>
            <h4>{inst.nomeInstancia}</h4>
            <p style={{ fontSize: "0.8rem", wordBreak: "break-all", opacity: 0.8 }}>{inst.token}</p>

            {inst.info && (
              <div style={{ marginTop: "1rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <img src={inst.info?.profilePicThumb || ''} alt="" style={{ width: "50px", height: "50px", borderRadius: "50%" }} />
                  <div>
                    <strong>{inst.info?.pushname || "Sem nome"}</strong><br />
                    <span>{inst.info?.wid?.user || "—"}</span>
                  </div>
                </div>
                <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem" }}>
                  <span>👥 {inst.info?.contactsLength ?? 0}</span>
                  <span>💬 {inst.info?.chatsLength ?? 0}</span>
                </div>
              </div>
            )}

            <div style={{ marginTop: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ background: "#22c55e", padding: "0.2rem 0.5rem", borderRadius: "8px", fontSize: "0.75rem" }}>Connected</span>
              <button onClick={() => deletar(i)} style={{ background: "#ef4444", color: "#fff", border: "none", padding: "0.3rem 0.8rem", borderRadius: "4px" }}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
