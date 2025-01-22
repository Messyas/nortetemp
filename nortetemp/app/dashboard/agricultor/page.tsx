'use client';

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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function AgricultorDashboard() {
  const [forecastData, setForecastData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get('/api/weather');
        setForecastData(response.data.DailyForecasts);
        setFilteredData(response.data.DailyForecasts);
      } catch (error) {
        console.error('Erro ao carregar os dados:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchWeatherData();
  }, []);

  const exportToCSV = () => {
    const csvContent = filteredData
      .map(
        (day) =>
          `${new Date(day.Date).toLocaleDateString()},${day.Day.ThunderstormProbability},${day.Day.PrecipitationProbability}`
      )
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dados_meteorologicos.csv';
    a.click();
  };

  if (loading) return <p className="text-center mt-10 text-lg">Carregando...</p>;

  const labels = filteredData.map((day) => new Date(day.Date).toLocaleDateString());
  const thunderstormProbabilities = filteredData.map((day) => day.Day.ThunderstormProbability);
  const precipitationProbabilities = filteredData.map((day) => day.Day.PrecipitationProbability);
  const maxTemperatures = filteredData.map((day) =>
    Math.round((day.Temperature.Maximum.Value - 32) * (5 / 9))
  );
  const minTemperatures = filteredData.map((day) =>
    Math.round((day.Temperature.Minimum.Value - 32) * (5 / 9))
  );
  const windSpeeds = filteredData.map((day) => day.Day.Wind.Speed.Value);

  const data = {
    labels,
    datasets: [
      {
        label: 'Probabilidade de Tempestade (%)',
        data: thunderstormProbabilities,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
      },
      {
        label: 'Probabilidade de Chuva (%)',
        data: precipitationProbabilities,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.4,
      },
      {
        label: 'Temperatura Máxima (°C)',
        data: maxTemperatures,
        borderColor: 'rgba(255, 206, 86, 1)',
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        tension: 0.4,
      },
      {
        label: 'Temperatura Mínima (°C)',
        data: minTemperatures,
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        tension: 0.4,
      },
      {
        label: 'Velocidade do Vento (km/h)',
        data: windSpeeds,
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Dados Meteorológicos - Próximos 5 Dias' },
    },
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h1 className="text-3xl font-bold text-center mb-6">Dashboard Meteorológico - Agricultores</h1>

      {/* Alerta de Tempestades */}
      {filteredData.some((day) => day.Day.ThunderstormProbability > 80) && (
        <div className="bg-red-500 text-white p-4 rounded shadow mb-6">
          <p className="font-bold">⚠️ Alerta: Alta probabilidade de tempestade nos próximos dias!</p>
        </div>
      )}

      {/* Recomendações para Plantio */}
      <div className="bg-green-500 text-white p-4 rounded shadow mb-6">
        <p className="font-bold">🌱 Recomendações para Plantio:</p>
        <ul className="list-disc pl-4">
          <li>Evite plantio em dias com alta probabilidade de chuva (>70%).</li>
          <li>Condições favoráveis para plantio em 3 dias.</li>
          <li>Verifique as condições do solo antes do plantio.</li>
        </ul>
      </div>

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
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 mr-2"
        >
          Mostrar Todos
        </button>
        <button
          onClick={exportToCSV}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Exportar Dados
        </button>
      </div>

      {/* Gráfico */}
      <Line data={data} options={options} />

      {/* Cards com Ícones e Informações Detalhadas */}
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
              <p>Mín: {Math.round((day.Temperature.Minimum.Value - 32) * (5 / 9))}°C</p>
              <p>Vento: {day.Day.Wind.Speed.Value} km/h</p>
              <p>Índice UV: {day.Day.UVIndex ? day.Day.UVIndex : 'N/A'}</p>
            </div>
            <img
              src={`/icons/${day.Day.Icon}.svg`}
              alt="Ícone do Clima"
              className="w-12 h-12"
            />
          </div>
        ))}
      </div>

      {/* Link para o grupo do Telegram */}
      <div className="mt-10 text-center">
        <div className="bg-gradient-to-r from-blue-500 to-green-500 text-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">🌐 Participe do nosso grupo no Telegram!</h2>
          <p className="text-lg">
            Fique por dentro das atualizações meteorológicas e dicas exclusivas para agricultores.
          </p>
          <a
            href="https://t.me/+y3R1L-AzHo80YTAx"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 px-6 py-3 bg-white text-blue-500 font-semibold rounded-lg shadow-md hover:bg-gray-200 transition"
          >
            👉 Acesse o Grupo no Telegram
          </a>
        </div>
      </div>

    </div>
  );
}
