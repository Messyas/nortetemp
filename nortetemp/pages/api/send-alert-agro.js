export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const {
      NEXT_PUBLIC_ACCUWEATHER_API_KEY,
      NEXT_PUBLIC_LOCATION_KEY,
      NEXT_PUBLIC_TELEGRAM_API_AGRO_URL,
      NEXT_PUBLIC_CHAT_AGRO_IDS,
    } = process.env;

    const accuweatherUrl = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${NEXT_PUBLIC_LOCATION_KEY}?apikey=${NEXT_PUBLIC_ACCUWEATHER_API_KEY}&details=true&language=pt-BR`;

    const weatherResponse = await fetch(accuweatherUrl);

    if (!weatherResponse.ok) {
      throw new Error(`Erro ao obter dados da API AccuWeather: ${weatherResponse.status}`);
    }

    const weatherData = await weatherResponse.json();

    const forecast = weatherData?.DailyForecasts;
    if (!forecast || forecast.length === 0) {
      throw new Error("Previsões meteorológicas não encontradas.");
    }

    // Gerar mensagem detalhada com os dados de todos os dias
    const message = forecast
      .map((day) => {
        const date = new Date(day.Date).toLocaleDateString("pt-BR");
        const minTempC = ((day.Temperature.Minimum.Value - 32) * 5) / 9;
        const maxTempC = ((day.Temperature.Maximum.Value - 32) * 5) / 9;
        const precipitationProbability = day.Day.PrecipitationProbability;
        const thunderstormProbability = day.Day.ThunderstormProbability;
        const windSpeed = day.Day.Wind.Speed.Value; // km/h
        const uvIndex = day.Day.UVIndex || "N/A";
        const hoursOfRain = day.Day.HoursOfRain || 0;
        const totalLiquid = (day.Day.TotalLiquid?.Value || 0) * 25.4; // Convert inches to mm

        return `
📅 *${date}*
🌡️ Temperatura: ${minTempC.toFixed(1)}°C a ${maxTempC.toFixed(1)}°C
🌧️ Probabilidade de chuva: ${precipitationProbability}%
⛈️ Probabilidade de tempestades: ${thunderstormProbability}%
💧 Precipitação total: ${totalLiquid.toFixed(1)} mm
⏱️ Horas de chuva: ${hoursOfRain.toFixed(1)} horas
🌬️ Velocidade do vento: ${windSpeed} km/h
🔆 Índice UV: ${uvIndex}
        `;
      })
      .join("\n\n");

    const fullMessage = `
⚠️ *Alerta Meteorológico para Agricultores* ⚠️

🌱 Informações detalhadas para os próximos dias:

${message}

🚨 Por favor, ajuste suas atividades agrícolas conforme as condições meteorológicas.
    `;

    // Enviar mensagem ao Telegram para o grupo de agricultores
    const telegramResponse = await fetch(NEXT_PUBLIC_TELEGRAM_API_AGRO_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: NEXT_PUBLIC_CHAT_AGRO_IDS,
        text: fullMessage,
        parse_mode: "Markdown",
      }),
    });

    if (!telegramResponse.ok) {
      throw new Error("Erro ao enviar mensagem para agricultores no Telegram");
    }

    return res.status(200).json({ success: true, message: "Alerta enviado para agricultores!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro interno no envio do alerta." });
  }
}
