import { Bot } from "grammy";
import config from "./config/config";
import { MyContext } from "./types/context";
import "reflect-metadata";
import { initMainRoutes } from "./modules/main/main.routes";
import { initWeatherRoutes } from "./modules/weather/weather.routes";

const bootstrap = async () => {
  const bot = new Bot<MyContext>(config.BOT_TOKEN);

  initMainRoutes(bot);
  initWeatherRoutes(bot);

  bot.start();
};

bootstrap();
