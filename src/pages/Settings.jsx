// crypto-platform/src/pages/Settings.jsx
import React, { useState } from 'react';
import axios from 'axios';

export default function Settings() {
  const [apiKey, setApiKey] = useState('');
  const [apiSecret, setApiSecret] = useState('');

  const saveSettings = async () => {
    await axios.post('/api/save-keys', { apiKey, apiSecret });
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">API Settings</h2>
      <input placeholder="API Key" value={apiKey} onChange={e => setApiKey(e.target.value)} className="border p-2 rounded w-full mb-2" />
      <input placeholder="API Secret" value={apiSecret} onChange={e => setApiSecret(e.target.value)} className="border p-2 rounded w-full mb-2" />
      <button onClick={saveSettings} className="bg-blue-500 text-white p-2 rounded">Save</button>
    </div>
  );
}
