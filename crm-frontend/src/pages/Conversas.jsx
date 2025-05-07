
import React, { useEffect, useState } from "react";

export default function Conversas() {
  const [conversas, setConversas] = useState([]);
  const [mensagens, setMensagens] = useState([]);
  const [chatSelecionado, setChatSelecionado] = useState(null);
  const [erro, setErro] = useState("");

  const config = JSON.parse(localStorage.getItem("evolutionAPI") || "{}");
  const urlBase = config?.url?.replace(/\/$/, ""); // remove barra final
  const instancia = config?.nomeInstancia;
  const token = config?.token;

  useEffect(() => {
    if (!urlBase || !instancia || !token) {
      setErro("Integração da Evolution não configurada.");
      return;
    }

    fetch(`${urlBase}/chat/findChats/${instancia}`, {
      headers: {
        "Content-Type": "application/json",
        "apikey": token
      }
    })
      .then(res => res.json())
      .then(data => setConversas(data))
      .catch(err => setErro("Erro ao carregar conversas."));
  }, []);

  const carregarMensagens = (jid) => {
    setChatSelecionado(jid);
    setMensagens([]);
    fetch(`${urlBase}/chat/findMessages/${instancia}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": token
      },
      body: JSON.stringify({ jid })
    })
      .then(res => res.json())
      .then(data => setMensagens(data))
      .catch(err => setErro("Erro ao carregar mensagens."));
  };

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "Arial, sans-serif" }}>
      <aside style={{ width: "30%", borderRight: "1px solid #ccc", overflowY: "auto", padding: "1rem" }}>
        <h3>Conversas</h3>
        {erro && <p style={{ color: "red" }}>{erro}</p>}
        {conversas.map((chat, index) => (
          <div
            key={index}
            onClick={() => carregarMensagens(chat.jid || chat.remoteJid)}
            style={{
              padding: "0.5rem",
              borderBottom: "1px solid #eee",
              cursor: "pointer",
              backgroundColor: chatSelecionado === (chat.jid || chat.remoteJid) ? "#f0f0f0" : "transparent"
            }}
          >
            <strong>{chat.name || chat.pushname || chat.shortName || chat.remoteJid}</strong><br />
            <small>Última mensagem: {new Date(chat.lastMessageTimestamp * 1000).toLocaleString()}</small>
          </div>
        ))}
      </aside>

      <main style={{ flex: 1, padding: "1rem", display: "flex", flexDirection: "column" }}>
        <h3>Histórico</h3>
        <div style={{ flex: 1, overflowY: "auto", border: "1px solid #ddd", padding: "1rem", borderRadius: "8px" }}>
          {mensagens.map((msg, i) => (
            <div key={i} style={{ marginBottom: "1rem", textAlign: msg.fromMe ? "right" : "left" }}>
              <div style={{
                display: "inline-block",
                backgroundColor: msg.fromMe ? "#dcf8c6" : "#f1f0f0",
                padding: "0.5rem",
                borderRadius: "8px",
                maxWidth: "70%"
              }}>
                {msg.content}
              </div>
              <div><small>{new Date(msg.timestamp * 1000).toLocaleString()}</small></div>
            </div>
          ))}
          {mensagens.length === 0 && <p style={{ color: "#999" }}>Selecione uma conversa para ver as mensagens.</p>}
        </div>
      </main>
    </div>
  );
}
