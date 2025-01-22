export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Método não permitido' });
    }
  
    try {
      const {
        NEXT_PUBLIC_TELEGRAM_API_JORNAL_URL,
        NEXT_PUBLIC_CHAT_JORNAL_IDS,
        NEXT_PUBLIC_ACCUWEATHER_API_KEY,
        NEXT_PUBLIC_LOCATION_KEY,
        NEXT_PUBLIC_GNEWS_API_KEY,
      } = process.env;
  
      // Obter dados climáticos
      const weatherResponse = await fetch(
        `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${NEXT_PUBLIC_LOCATION_KEY}?apikey=${NEXT_PUBLIC_ACCUWEATHER_API_KEY}&details=true&language=pt-BR`
      );
      const weatherData = await weatherResponse.json();
  
      // Obter notícias climáticas
      const newsResponse = await fetch(
        `https://gnews.io/api/v4/search?q=climate%20weather&token=${NEXT_PUBLIC_GNEWS_API_KEY}&lang=pt&country=br`
      );
      const newsData = await newsResponse.json();
  
      const forecast = weatherData?.DailyForecasts || [];
      const news = newsData?.articles.slice(0, 5) || [];
  
      // Formatar mensagem detalhada para jornalistas
      const forecastMessage = forecast
        .map((day) => {
          const date = new Date(day.Date).toLocaleDateString('pt-BR');
          const minTemp = day.Temperature.Minimum.Value;
          const maxTemp = day.Temperature.Maximum.Value;
          const precipitation = day.Day?.PrecipitationProbability || 0;
          const thunderstorms = day.Day?.ThunderstormProbability || 0;
          return `
  📅 ${date}
  🌡️ Temperatura: ${minTemp}°C a ${maxTemp}°C
  🌧️ Probabilidade de chuva: ${precipitation}%
  ⛈️ Probabilidade de tempestades: ${thunderstorms}%`;
        })
        .join('\n\n');
  
      const newsMessage = news
        .map((article) => `📰 [${article.title}](${article.url})`)
        .join('\n');
  
      const message = `
  ⚠️ *Alerta Jornalístico* ⚠️
  
  🌍 *Previsão Climática:*
  ${forecastMessage}
  
  📰 *Últimas Notícias Climáticas:*
  ${newsMessage}
      `;
  
      // Enviar mensagem ao Telegram
      const telegramResponse = await fetch(NEXT_PUBLIC_TELEGRAM_API_JORNAL_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: NEXT_PUBLIC_CHAT_JORNAL_IDS,
          text: message,
          parse_mode: 'Markdown',
        }),
      });
  
      if (!telegramResponse.ok) {
        throw new Error('Erro ao enviar mensagem para jornalistas no Telegram.');
      }
  
      res.status(200).json({ success: true, message: 'Alerta enviado para jornalistas!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro interno ao enviar o alerta.' });
    }
  }
  