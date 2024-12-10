"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Dashboard() {
  const [forecastData, setForecastData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get("/api/weather");
        setForecastData(response.data.DailyForecasts);
        setFilteredData(response.data.DailyForecasts);
      } catch (error) {
        console.error("Erro ao carregar os dados:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchWeatherData();
  }, []);

  if (loading) return <p className="text-center mt-10 text-lg">Carregando...</p>;

  // Preparar dados para o gráfico
  const labels = filteredData.map((day) => new Date(day.Date).toLocaleDateString());
  const thunderstormProbabilities = filteredData.map((day) => day.Day.ThunderstormProbability);
  const precipitationProbabilities = filteredData.map((day) => day.Day.PrecipitationProbability);

  const data = {
    labels,
    datasets: [
      {
        label: "Probabilidade de Tempestade (%)",
        data: thunderstormProbabilities,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
      },
      {
        label: "Probabilidade de Chuva (%)",
        data: precipitationProbabilities,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Probabilidade de Chuva e Tempestade - Próximos 5 Dias" },
    },
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h1 className="text-3xl font-bold text-center mb-6">Dashboard Meteorológico</h1>

      {/* Botões de Filtro */}
      <div className="text-center mb-4">
        <button
          onClick={() =>
            setFilteredData(forecastData.filter((day) => day.Day.ThunderstormProbability > 50))
          }
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mr-2"
        >
          Tempestades > 50%
        </button>
        <button
          onClick={() => setFilteredData(forecastData)}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          Mostrar Todos
        </button>
      </div>

      {/* Gráfico */}
      <Line data={data} options={options} />

      {/* Cards com Ícones */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredData.map((day, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow"
          >
            <div>
              <p className="font-semibold text-lg">{new Date(day.Date).toLocaleDateString()}</p>
              <p>Tempestades: {day.Day.ThunderstormProbability}%</p>
              <p>Chuva: {day.Day.PrecipitationProbability}%</p>
              <p>Máx: {Math.round((day.Temperature.Maximum.Value - 32) * (5 / 9))}°C</p>
            </div>
            <img
              src={`/icons/${day.Day.Icon}.svg`}
              alt="Ícone do Clima"
              className="w-8 h-8"
            />
          </div>
        ))}
      </div>
    </div>
  );
}