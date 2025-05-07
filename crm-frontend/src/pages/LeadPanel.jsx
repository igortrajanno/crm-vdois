
import React, { useState, useEffect } from 'react';

const LeadPanel = ({ selectedLead, onClose, onSave }) => {
  const [lead, setLead] = useState({ name: '', phone: '', email: '', origin: '', company: '' });

  useEffect(() => {
    if (selectedLead) setLead(selectedLead);
  }, [selectedLead]);

  const handleChange = (field, value) => {
    setLead({ ...lead, [field]: value });
  };

  const handleSave = () => {
    onSave(lead);
    onClose();
  };

  return (
    <div style={{ width: '300px', padding: '20px', backgroundColor: 'white', position: 'fixed', right: 0, top: 0, height: '100vh', boxShadow: '-2px 0 5px rgba(0,0,0,0.1)' }}>
      <button onClick={onClose} style={{ float: 'right' }}>X</button>
      <h3>{selectedLead ? 'Editar Lead' : 'Novo Lead'}</h3>
      <input placeholder="Nome" value={lead.name} onChange={e => handleChange('name', e.target.value)} /><br />
      <input placeholder="Telefone" value={lead.phone} onChange={e => handleChange('phone', e.target.value)} /><br />
      <input placeholder="Email" value={lead.email} onChange={e => handleChange('email', e.target.value)} /><br />
      <input placeholder="Origem" value={lead.origin} onChange={e => handleChange('origin', e.target.value)} /><br />
      <input placeholder="Empresa" value={lead.company} onChange={e => handleChange('company', e.target.value)} /><br />
      <button style={{ marginTop: '10px', background: 'green', color: 'white' }} onClick={handleSave}>Salvar</button>
    </div>
  );
};

export default LeadPanel;
