import { Bot } from "grammy";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const bot = new Bot(process.env.BOT_TOKEN as string);
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

bot.on("message:location", async (ctx) => {
  const location = ctx.message?.location;

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${location?.latitude}&lon=${location?.longitude}&appid=${WEATHER_API_KEY}&units=metric&lang=ru`
    );

    const weather = response.data;
    const message = `
Погода в указанной локации:
🌡 Температура: ${Math.round(weather.main.temp)}°C
💨 Ветер: ${weather.wind.speed} м/с
💧 Влажность: ${weather.main.humidity}%
🌤 ${weather.weather[0].description}
    `;

    await ctx.reply(message);
  } catch (error) {
    await ctx.reply("Извините, не удалось получить информацию о погоде");
  }
});

bot.command("start", async (ctx) => {
  await ctx.reply(
    "Привет! Нажмите на кнопку ниже, чтобы отправить свою геопозицию",
    {
      reply_markup: {
        keyboard: [
          [
            {
              text: "📍 Отправить геопозицию",
              request_location: true,
            },
          ],
        ],
        resize_keyboard: true,
      },
    }
  );
});

bot.start();
