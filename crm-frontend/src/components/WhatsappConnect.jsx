
import React, { useEffect, useState } from "react";

export default function WhatsappConnect() {
  const [accessToken, setAccessToken] = useState(null);
  const [phoneNumbers, setPhoneNumbers] = useState([]);
  const [selectedNumber, setSelectedNumber] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      fetch(`https://graph.facebook.com/v19.0/oauth/access_token?client_id=1315297066192895&redirect_uri=https://fb21-2804-d49-4945-4800-b9-9382-f9a8-687f.ngrok-free.app/&client_secret=SEU_CLIENT_SECRET&code=${code}`)
        .then(res => res.json())
        .then(data => {
          setAccessToken(data.access_token);
        });
    }
  }, []);

  useEffect(() => {
    if (accessToken) {
      fetch(`https://graph.facebook.com/v19.0/me?fields=business_accounts&access_token=${accessToken}`)
        .then(res => res.json())
        .then(data => {
          const businessId = data.business_accounts?.data?.[0]?.id;
          if (businessId) {
            fetch(`https://graph.facebook.com/v19.0/${businessId}/client_whatsapp_business_accounts?access_token=${accessToken}`)
              .then(res => res.json())
              .then(res => {
                const wabaId = res.data?.[0]?.id;
                if (wabaId) {
                  fetch(`https://graph.facebook.com/v19.0/${wabaId}/phone_numbers?access_token=${accessToken}`)
                    .then(res => res.json())
                    .then(data => {
                      setPhoneNumbers(data.data || []);
                    });
                }
              });
          }
        });
    }
  }, [accessToken]);

  const handleSelect = (e) => setSelectedNumber(e.target.value);

  const handleConnect = () => {
    if (selectedNumber) {
      alert("Número conectado: " + selectedNumber);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Integração WhatsApp Cloud API</h1>
      {accessToken ? (
        <div className="space-y-4">
          <label className="block font-semibold">Selecione um número:</label>
          <select
            value={selectedNumber}
            onChange={handleSelect}
            className="border border-gray-300 px-4 py-2 rounded w-full"
          >
            <option value="">-- Escolha um número --</option>
            {phoneNumbers.map((num) => (
              <option key={num.id} value={num.display_phone_number}>
                {num.display_phone_number}
              </option>
            ))}
          </select>
          <button
            onClick={handleConnect}
            className="mt-4 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Conectar número selecionado
          </button>
        </div>
      ) : (
        <a
          href="https://www.facebook.com/v19.0/dialog/oauth?client_id=1315297066192895&redirect_uri=https://fb21-2804-d49-4945-4800-b9-9382-f9a8-687f.ngrok-free.app/&response_type=code&scope=whatsapp_business_management,whatsapp_business_messaging,business_management"
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Conectar conta do WhatsApp Business
        </a>
      )}
    </div>
  );
}
