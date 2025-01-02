import { NextResponse } from "next/server";
import axios from "axios";

const BOT_TOKEN = "7931303919:AAEBmTRYegxSSvBJH1esYk3jjGU-S7ZgnOM";
const TELEGRAM_API_URL = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

const CHAT_IDS = ["-1002410146633"]; 

export async function POST(request: Request) {
  try {
    const weatherData = [
      {
        date: "2025-01-02", 
        headline: "Tempestade forte chegando em Manaus.",
        severity: 3,
        description: "Ventos fortes e chuvas intensas são esperados hoje.",
      },
    ];

    const alerts = weatherData.filter((data) => data.severity >= 3);

    if (alerts.length === 0) {
      return NextResponse.json({ message: "Sem alertas importantes no momento." });
    }

    const messages = alerts.map((alert) => {
      const [year, month, day] = alert.date.split("-");
      const formattedDate = `${day}/${month}/${year}`;

      return `⚠️ *Alerta Meteorológico* ⚠️\n\n📅 Data: ${formattedDate}\n🌩️ ${alert.headline}\n📝 ${alert.description}\n\n🚨 Por favor, fique atento e siga as orientações locais.`;
    });

    for (const chatId of CHAT_IDS) {
      for (const message of messages) {
        await axios.post(TELEGRAM_API_URL, {
          chat_id: chatId,
          text: message,
          parse_mode: "Markdown",
        });
      }
    }

    return NextResponse.json({ message: "Notificações enviadas com sucesso!" });
  } catch (error) {
    console.error("Erro ao enviar notificações:", error);
    return NextResponse.json({ error: "Erro ao processar notificações." }, { status: 500 });
  }
}
