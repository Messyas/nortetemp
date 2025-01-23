'use client';

import React, { useEffect, useState } from 'react';

const WeatherMap = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [weatherData, setWeatherData] = useState<any>(null);
  const [overlay, setOverlay] = useState('rain');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          `https://dataservice.accuweather.com/currentconditions/v1/${process.env.NEXT_PUBLIC_LOCATION_KEY}?apikey=${process.env.NEXT_PUBLIC_ACCUWEATHER_API_KEY}&details=true&language=pt-BR`
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
 
      <header className="bg-blue-600 text-white p-6 shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-center">🌎 Mapa Meteorológico</h1>
        <p className="text-center mt-2 text-lg">Condições climáticas em tempo real.</p>
      </header>

      <div className="flex justify-around bg-white p-6 shadow-md rounded-lg mx-6 mt-6 text-gray-700">
        {weatherData ? (
          <>
            <div className="text-center">
              <h2 className="font-bold text-lg">🌡️ Temperatura</h2>
              <p className="text-xl">{weatherData.Temperature.Metric.Value}°C</p>
            </div>
            <div className="text-center">
              <h2 className="font-bold text-lg">🌤️ Condições</h2>
              <p className="text-xl">{weatherData.WeatherText}</p>
            </div>
            <div className="text-center">
              <h2 className="font-bold text-lg">💧 Umidade</h2>
              <p className="text-xl">{weatherData.RelativeHumidity}%</p>
            </div>
          </>
        ) : (
          <p className="text-lg">Carregando dados do clima...</p>
        )}
      </div>

      <div className="flex justify-center space-x-4 py-6">
        {['rain', 'temp', 'wind'].map((option) => (
          <button
            key={option}
            className={`px-6 py-3 rounded-lg text-lg font-semibold transition ${
              overlay === option
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
            }`}
            onClick={() => updateMapOverlay(option)}
          >
            {option === 'rain' ? '🌧️ Chuva' : option === 'temp' ? '🌡️ Temperatura' : '💨 Vento'}
          </button>
        ))}
      </div>


      <main className="flex-grow flex justify-center items-center py-6 relative">
        {loading && (
          <div className="absolute inset-0 flex justify-center items-center bg-gray-200 rounded-lg shadow-lg z-10">
            <p className="text-blue-600 font-bold text-lg">Carregando mapa...</p>
          </div>
        )}
        <div className="w-full max-w-4xl border-2 border-gray-300 shadow-lg rounded-lg overflow-hidden">
          <iframe
            title="Mapa Windy"
            src={`https://embed.windy.com/embed2.html?lat=-3.1&lon=-60.025&zoom=10&level=surface&overlay=${overlay}&menu=&message=&marker=&calendar=&pressure=&type=map&location=coordinates&detail=&detailLat=-3.1&detailLon=-60.025&metricWind=default&metricTemp=default&radarRange=`}
            width="100%"
            height="600"
            frameBorder="0"
            className="rounded-lg"
            onLoad={() => setLoading(false)}
          ></iframe>
        </div>
      </main>

    
      <footer className="bg-blue-600 text-white p-6 text-center rounded-lg shadow-md">
        <p className="text-lg">
          Receba alertas no Telegram:{' '}
          <a
            href="https://t.me/+eCG9Ns3kjq83Yjdh"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-yellow-300 hover:text-yellow-400 transition"
          >
            👉 Clique aqui para participar
          </a>
        </p>
      </footer>
    </div>
  );
};

export default WeatherMap;
