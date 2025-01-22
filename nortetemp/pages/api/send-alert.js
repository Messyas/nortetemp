export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    const {
      NEXT_PUBLIC_ACCUWEATHER_API_KEY,
      NEXT_PUBLIC_LOCATION_KEY,
      NEXT_PUBLIC_TELEGRAM_API_URL,
      NEXT_PUBLIC_CHAT_IDS,
    } = process.env;

    // URL do endpoint para previsão diária de 1 dia com idioma pt-BR
    const accuweatherUrl = `http://dataservice.accuweather.com/forecasts/v1/daily/1day/${NEXT_PUBLIC_LOCATION_KEY}?apikey=${NEXT_PUBLIC_ACCUWEATHER_API_KEY}&details=true&language=pt-BR`;

    const weatherResponse = await fetch(accuweatherUrl);

    if (!weatherResponse.ok) {
      throw new Error(`Erro ao obter dados da API AccuWeather: ${weatherResponse.status}`);
    }

    const weatherData = await weatherResponse.json();

    // Obter informações do campo `Headline.Text` para previsão detalhada
    const headlineText = weatherData.Headline?.Text;

    // Extrair informações do dia atual
    const forecast = weatherData?.DailyForecasts?.[0];
    if (!forecast) {
      throw new Error('Previsão do tempo não encontrada.');
    }

    const minTempF = forecast.Temperature.Minimum.Value;
    const maxTempF = forecast.Temperature.Maximum.Value;
    const precipitationProbability = forecast.Day.PrecipitationProbability;

    // Conversão de temperaturas para Celsius
    const minTempC = ((minTempF - 32) * 5) / 9;
    const maxTempC = ((maxTempF - 32) * 5) / 9;

    const date = new Date(forecast.Date).toLocaleDateString('pt-BR');

    // Formatar a mensagem com o texto do Headline
    const message = `
⚠️ *Alerta Meteorológico* ⚠️

📅 Data: ${date}
🌡️ Temperatura: ${minTempC.toFixed(1)}°C a ${maxTempC.toFixed(1)}°C
🌧️ Probabilidade de chuva: ${precipitationProbability}%

📝 ${headlineText}

🚨 Por favor, fique atento às condições meteorológicas.
`;

    // Enviar a mensagem ao Telegram
    const telegramResponse = await fetch(NEXT_PUBLIC_TELEGRAM_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: NEXT_PUBLIC_CHAT_IDS,
        text: message,
        parse_mode: "Markdown",
      }),
    });

    if (!telegramResponse.ok) {
      throw new Error('Erro ao enviar mensagem para o Telegram');
    }

    return res.status(200).json({ success: true, message: "Alerta enviado com sucesso!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro interno no envio do alerta." });
  }
}
