"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [forecastData, setForecastData] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get('/api/weather');
        console.log("Resposta da API:", response.data); // Log da resposta completa
        setForecastData(response.data.DailyForecasts);
      } catch (error) {
        console.error("Erro ao carregar os dados:", error);
      }
    };
    fetchWeatherData();
  }, []);

  if (!forecastData) return <p>Carregando...</p>;

  return (
    <div>
      <h1>Previsão de Tempestades para 5 Dias</h1>
      {forecastData.map((day, index) => (
        <div key={index}>
          <h2>{new Date(day.Date).toLocaleDateString()}</h2>
          <p>Probabilidade de Tempestade: {day.Day.ThunderstormProbability}%</p>
          <p>Descrição: {day.Day.IconPhrase}</p>
        </div>
      ))}
    </div>
  );
}
