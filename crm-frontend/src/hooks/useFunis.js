import { useState, useEffect } from "react";

const STORAGE_KEY = "crm_funis";
const FINAIS_FIXAS = ["✅ Ganho", "❌ Perdido"];

export function useFunis() {
  const [funis, setFunis] = useState({});

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      const completado = {};
      for (const nome in parsed) {
        completado[nome] = ensureFinais(parsed[nome]);
      }
      setFunis(completado);
    }
  }, []);

  const save = (data) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    setFunis(data);
  };

  const ensureFinais = (fases) => {
    const semFinais = fases.filter(f => !FINAIS_FIXAS.includes(f));
    return [...semFinais, ...FINAIS_FIXAS];
  };

  const addFunil = (nome) => {
    const updated = {
      ...funis,
      [nome]: ensureFinais([])
    };
    save(updated);
  };

  const addFase = (funil, fase) => {
    const fases = funis[funil] || [];
    const updated = {
      ...funis,
      [funil]: ensureFinais([...fases.filter(f => !FINAIS_FIXAS.includes(f)), fase])
    };
    save(updated);
  };

  const deleteFase = (funil, fase) => {
    const fases = funis[funil] || [];
    const updated = {
      ...funis,
      [funil]: ensureFinais(fases.filter(f => f !== fase))
    };
    save(updated);
  };

  const deleteFunil = (nome) => {
    const copy = { ...funis };
    delete copy[nome];
    save(copy);
  };

  return {
    funis,
    addFunil,
    addFase,
    deleteFase,
    deleteFunil
  };
}