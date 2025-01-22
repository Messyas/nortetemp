'use client';

import { useState } from 'react';

export default function Home() {
  const [loadingStandard, setLoadingStandard] = useState(false);
  const [loadingAgro, setLoadingAgro] = useState(false);
  const [loadingJornalistas, setLoadingJornalistas] = useState(false);

  const sendAlertStandard = async () => {
    setLoadingStandard(true);
    try {
      const response = await fetch('/api/send-alert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) throw new Error('Erro ao enviar alerta padrão.');
      alert('Alerta enviado para usuários padrão com sucesso!');
    } catch (error) {
      console.error(error);
      alert('Erro ao enviar alerta padrão.');
    } finally {
      setLoadingStandard(false);
    }
  };

  const sendAlertAgro = async () => {
    setLoadingAgro(true);
    try {
      const response = await fetch('/api/send-alert-agro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) throw new Error('Erro ao enviar alerta para agricultores.');
      alert('Alerta enviado para agricultores com sucesso!');
    } catch (error) {
      console.error(error);
      alert('Erro ao enviar alerta para agricultores.');
    } finally {
      setLoadingAgro(false);
    }
  };

  const sendAlertJornalistas = async () => {
    setLoadingJornalistas(true);
    try {
      const response = await fetch('/api/send-alert-jornalistas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) throw new Error('Erro ao enviar alerta para jornalistas.');
      alert('Alerta enviado para jornalistas com sucesso!');
    } catch (error) {
      console.error(error);
      alert('Erro ao enviar alerta para jornalistas.');
    } finally {
      setLoadingJornalistas(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Envio de Alertas Meteorológicos</h1>

      <div className="flex flex-col gap-4">
        {/* Botão para usuários padrão */}
        <button
          onClick={sendAlertStandard}
          disabled={loadingStandard}
          className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 disabled:opacity-50"
        >
          {loadingStandard ? 'Enviando Alerta Padrão...' : 'Enviar Alerta para Usuários Padrão'}
        </button>

        {/* Botão para agricultores */}
        <button
          onClick={sendAlertAgro}
          disabled={loadingAgro}
          className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 disabled:opacity-50"
        >
          {loadingAgro ? 'Enviando Alerta Agro...' : 'Enviar Alerta para Agricultores'}
        </button>

        {/* Botão para jornalistas */}
        <button
          onClick={sendAlertJornalistas}
          disabled={loadingJornalistas}
          className="px-6 py-3 bg-purple-500 text-white font-semibold rounded-lg hover:bg-purple-600 disabled:opacity-50"
        >
          {loadingJornalistas ? 'Enviando Alerta Jornalístico...' : 'Enviar Alerta para Jornalistas'}
        </button>
      </div>
    </div>
  );
}
