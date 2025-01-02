"use client";

import { useState } from "react";

export default function AlertPage() {
  const [status, setStatus] = useState("");

  const sendAlerts = async () => {
    try {
      const response = await fetch("/api/alerts", {
        method: "POST",
      });

      const result = await response.json();
      setStatus(result.message || "Notificações enviadas com sucesso!");
    } catch (error) {
      setStatus("Erro ao enviar notificações.");
      console.error(error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Enviar Alertas Meteorológicos</h1>
      <button
        onClick={sendAlerts}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Enviar Alertas
      </button>
      {status && <p className="mt-4">{status}</p>}
    </div>
  );
}
