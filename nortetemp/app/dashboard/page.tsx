"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Registrar os componentes do Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Dashboard() {
  const [forecastData, setForecastData] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get('/api/weather');
        setForecastData(response.data.DailyForecasts);
      } catch (error) {
        console.error("Erro ao carregar os dados:", error);
      }
    };
    fetchWeatherData();
  }, []);

  if (!forecastData) return <p>Carregando...</p>;

  // Preparar dados para o gráfico
  const labels = forecastData.map((day) => new Date(day.Date).toLocaleDateString());
  const thunderstormProbabilities = forecastData.map((day) => day.Day.ThunderstormProbability);

  const data = {
    labels,
    datasets: [
      {
        label: "Probabilidade de Tempestade (%)",
        data: thunderstormProbabilities,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Previsão de Tempestades - Próximos 5 Dias',
      },
    },
  };

  return (
    <div>
      <h1>Previsão de Tempestades</h1>
      <Line data={data} options={options} />
    </div>
  );
}
