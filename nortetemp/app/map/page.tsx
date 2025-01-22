'use client';

import React, { useEffect, useState } from 'react';

const WeatherMap = () => {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [overlay, setOverlay] = useState('rain');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          `https://dataservice.accuweather.com/currentconditions/v1/${process.env.NEXT_PUBLIC_LOCATION_KEY}?apikey=${process.env.NEXT_PUBLIC_ACCUWEATHER_API_KEY}`
        );
        const data = await response.json();
        setWeatherData(data[0]);
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
      }
    };

    fetchWeatherData();
  }, []);

  const updateMapOverlay = (newOverlay: string) => {
    setOverlay(newOverlay);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Cabeçalho */}
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <h1 className="text-3xl font-bold text-center">Mapa Meteorológico</h1>
        <p className="text-center mt-1">Condições climáticas em tempo real.</p>
      </header>

      {/* Barra de status do clima */}
      <div className="flex justify-around bg-gray-200 p-4 text-gray-700">
        {weatherData ? (
          <>
            <div>
              <h2 className="font-bold">Temperatura</h2>
              <p>{weatherData.Temperature.Metric.Value}°C</p>
            </div>
            <div>
              <h2 className="font-bold">Condições</h2>
              <p>{translateCondition(weatherData.WeatherText)}</p>
            </div>
            <div>
              <h2 className="font-bold">Umidade</h2>
              <p>{weatherData.RelativeHumidity}%</p>
            </div>
          </>
        ) : (
          <p>Carregando dados do clima...</p>
        )}
      </div>

      {/* Botões de seleção de camada */}
      <div className="flex justify-center space-x-4 py-4">
        <button
          className={`px-4 py-2 rounded ${
            overlay === 'rain' ? 'bg-blue-600 text-white' : 'bg-gray-300'
          }`}
          onClick={() => updateMapOverlay('rain')}
        >
          Chuva
        </button>
        <button
          className={`px-4 py-2 rounded ${
            overlay === 'temp' ? 'bg-blue-600 text-white' : 'bg-gray-300'
          }`}
          onClick={() => updateMapOverlay('temp')}
        >
          Temperatura
        </button>
        <button
          className={`px-4 py-2 rounded ${
            overlay === 'wind' ? 'bg-blue-600 text-white' : 'bg-gray-300'
          }`}
          onClick={() => updateMapOverlay('wind')}
        >
          Vento
        </button>
      </div>

      {/* Mapa */}
      <main className="flex-grow flex justify-center items-center py-6 relative">
        {loading && (
          <div className="absolute inset-0 flex justify-center items-center bg-gray-200 z-10">
            <p className="text-blue-600 font-bold">Carregando mapa...</p>
          </div>
        )}
        <div className="w-full max-w-4xl border-2 border-gray-300 shadow-md rounded-lg overflow-hidden">
          <iframe
            title="Mapa Windy"
            src={`https://embed.windy.com/embed2.html?lat=-3.1&lon=-60.025&zoom=10&level=surface&overlay=${overlay}&menu=&message=&marker=&calendar=&pressure=&type=map&location=coordinates&detail=&detailLat=-3.1&detailLon=-60.025&metricWind=default&metricTemp=default&radarRange=`}
            width="100%"
            height="600"
            frameBorder="0"
            className="rounded"
            onLoad={() => setLoading(false)}
          ></iframe>
        </div>
      </main>

      {/* Rodapé */}
      <footer className="bg-blue-600 text-white p-4 text-center">
        <p>
          Receba alertas no Telegram:{' '}
          <a
            href="https://t.me/+eCG9Ns3kjq83Yjdh"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-yellow-300"
          >
            Clique aqui para participar
          </a>
          .
        </p>
      </footer>
    </div>
  );
};

// Função para traduzir as condições climáticas
const translateCondition = (condition: string): string => {
  const translations: { [key: string]: string } = {
    Cloudy: 'Nublado',
    Sunny: 'Ensolarado',
    Rain: 'Chuva',
    Snow: 'Neve',
    Fog: 'Nevoeiro',
    Clear: 'Limpo',
    Thunderstorms: 'Trovoadas',
    // Adicione outras traduções conforme necessário
  };

  return translations[condition] || condition;
};

export default WeatherMap;
