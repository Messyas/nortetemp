// pages/api/weather.js
import axios from 'axios';

export default async function handler(req, res) {
  const { NEXT_PUBLIC_ACCUWEATHER_API_KEY, NEXT_PUBLIC_LOCATION_KEY } = process.env;
  const url = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${NEXT_PUBLIC_LOCATION_KEY}?apikey=${NEXT_PUBLIC_ACCUWEATHER_API_KEY}&details=true`;

  try {
    const response = await axios.get(url);
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Erro ao buscar dados da AccuWeather:", error);
    res.status(500).json({ error: "Erro ao buscar dados da AccuWeather" });
  }
}