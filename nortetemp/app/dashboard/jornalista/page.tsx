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

export default function JornalistaDashboard() {
  const [forecastData, setForecastData] = useState([]);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${process.env.NEXT_PUBLIC_LOCATION_KEY}?apikey=${process.env.NEXT_PUBLIC_ACCUWEATHER_API_KEY}&metric=true`
        );
        setForecastData(response.data.DailyForecasts);
      } catch (error) {
        console.error('Erro ao carregar os dados meteorológicos:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchNews = async () => {
      try {
        const response = await axios.get(
          `https://gnews.io/api/v4/search?q=climate%20weather&token=${process.env.NEXT_PUBLIC_GNEWS_API_KEY}&lang=pt&country=br`
        );
        setNews(response.data.articles);
      } catch (error) {
        console.error('Erro ao carregar notícias:', error);
      }
    };

    fetchWeatherData();
    fetchNews();
  }, []);

  if (loading) return <p className="text-center mt-10 text-lg">Carregando...</p>;

  const labels = forecastData.map((day) => new Date(day.Date).toLocaleDateString());
  const maxTemperatures = forecastData.map((day) => day.Temperature.Maximum.Value || 0);
  const minTemperatures = forecastData.map((day) => day.Temperature.Minimum.Value || 0);
  const precipitationProbabilities = forecastData.map((day) =>
    day.Day?.PrecipitationProbability ?? 0
  );
  const thunderstormProbabilities = forecastData.map((day) =>
    day.Day?.ThunderstormProbability ?? 0
  );

  const maxTemp = Math.max(...maxTemperatures);
  const minTemp = Math.min(...minTemperatures);
  const maxPrecipitation = Math.max(...precipitationProbabilities);
  const maxThunderstorm = Math.max(...thunderstormProbabilities);

  const maxTempDate = maxTemp !== -Infinity ? labels[maxTemperatures.indexOf(maxTemp)] : 'N/A';
  const minTempDate = minTemp !== Infinity ? labels[minTemperatures.indexOf(minTemp)] : 'N/A';
  const maxPrecipitationDate =
    maxPrecipitation !== 0 ? labels[precipitationProbabilities.indexOf(maxPrecipitation)] : 'N/A';
  const maxThunderstormDate =
    maxThunderstorm !== 0 ? labels[thunderstormProbabilities.indexOf(maxThunderstorm)] : 'N/A';

  const lineChartData = {
    labels,
    datasets: [
      {
        label: 'Temperatura Máxima (°C)',
        data: maxTemperatures,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
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
        label: 'Probabilidade de Chuva (%)',
        data: precipitationProbabilities,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
      },
      {
        label: 'Probabilidade de Tempestade (%)',
        data: thunderstormProbabilities,
        borderColor: 'rgba(255, 159, 64, 1)',
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Probabilidades de Chuva, Tempestade e Temperaturas' },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Percentual / Temperatura' },
      },
    },
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h1 className="text-3xl font-bold text-center mb-6">Dashboard Meteorológico - Jornalistas</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-blue-500 text-white p-4 rounded shadow">
          <h2 className="text-xl font-bold">📊 Destaques Climáticos</h2>
          <p>Dia mais quente: {maxTemp}°C em {maxTempDate}</p>
          <p>Dia mais frio: {minTemp}°C em {minTempDate}</p>
          <p>Maior probabilidade de chuva: {maxPrecipitation}% em {maxPrecipitationDate}</p>
          <p>Maior probabilidade de tempestade: {maxThunderstorm}% em {maxThunderstormDate}</p>
        </div>

        <div className="bg-green-500 text-white p-4 rounded shadow">
          <h2 className="text-xl font-bold">🌍 Notícias Climáticas</h2>
          <ul className="list-disc pl-4">
            {news.length > 0 ? (
              news.slice(0, 5).map((article, index) => (
                <li key={index}>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white underline"
                  >
                    {article.title}
                  </a>
                </li>
              ))
            ) : (
              <p>Nenhuma notícia disponível no momento.</p>
            )}
          </ul>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">📈 Variações de Temperatura e Probabilidades</h2>
        <Line data={lineChartData} options={options} />
      </div>
    </div>
  );
}
