
import React, { useState } from "react";
import LeadForm from "./LeadForm";

export default function NovoLeadModal({ onClose, onSalvar }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl max-h-screen overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-4">Novo Lead</h2>
        <LeadForm onSalvar={onSalvar} onCancelar={onClose} />
      </div>
    </div>
  );
}
