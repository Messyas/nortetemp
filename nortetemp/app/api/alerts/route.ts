import { NextResponse } from "next/server";
import axios from "axios";

const BOT_TOKEN = process.env.NEXT_PUBLIC_BOT_TOKEN!;
const TELEGRAM_API_URL = process.env.NEXT_PUBLIC_TELEGRAM_API_URL!;
const CHAT_IDS = process.env.NEXT_PUBLIC_CHAT_IDS!.split(",");

const ACCUWEATHER_API_KEY = process.env.NEXT_PUBLIC_ACCUWEATHER_API_KEY!;
const LOCATION_KEY = process.env.NEXT_PUBLIC_LOCATION_KEY!;
const ACCUWEATHER_URL = `http://dataservice.accuweather.com/forecasts/v1/daily/1day/${LOCATION_KEY}?apikey=${ACCUWEATHER_API_KEY}&language=pt-br&details=true`;

export async function POST(request: Request) {
  try {
    // AccuWeather
    const response = await axios.get(ACCUWEATHER_URL);
    const forecast = response.data.DailyForecasts[0];

    const date = new Date(forecast.Date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    const headline = response.data.Headline.Text;

    // Conversão de temperaturas de Fahrenheit para Celsius
    const minTempCelsius = ((forecast.Temperature.Minimum.Value - 32) * 5) / 9;
    const maxTempCelsius = ((forecast.Temperature.Maximum.Value - 32) * 5) / 9;

    const rainProbability = forecast.Day.PrecipitationProbability;

    const message = `⚠️ *Alerta Meteorológico para Manaus* ⚠️\n\n📅 Data: ${date}\n🌡️ Temperatura: ${minTempCelsius.toFixed(
      1
    )}°C a ${maxTempCelsius.toFixed(1)}°C\n🌧️ Probabilidade de chuva: ${rainProbability}%\n\n📝 ${headline}\n\n🚨 Por favor, fique atento às condições meteorológicas.`;

    for (const chatId of CHAT_IDS) {
      await axios.post(TELEGRAM_API_URL.replace("${NEXT_PUBLIC_BOT_TOKEN}", BOT_TOKEN), {
        chat_id: chatId.trim(),
        text: message,
        parse_mode: "Markdown",
      });
    }

    return NextResponse.json({ message: "Notificações enviadas com sucesso!" });
  } catch (error) {
    console.error("Erro ao enviar notificações:", error);
    return NextResponse.json({ error: "Erro ao processar notificações." }, { status: 500 });
  }
}