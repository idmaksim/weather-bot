import { Bot } from "grammy";
import config from "./config/config";
import { MyContext } from "./types/context";
import "reflect-metadata";
import { initMainRoutes } from "./modules/main/main.routes";
import { initWeatherRoutes } from "./modules/weather/weather.routes";
import logger from "./config/logger";
import { run } from "@grammyjs/runner";

const bootstrap = async () => {
  const bot = new Bot<MyContext>(config.BOT_TOKEN);

  bot.use(async (ctx, next) => {
    logger.info("Новое сообщение", {
      message: ctx.message?.text,
      user: ctx.from?.username,
      chatId: ctx.chat?.id,
      chatType: ctx.chat?.type,
      userId: ctx.from?.id,
    });
    await next();
  });

  initMainRoutes(bot);
  initWeatherRoutes(bot);

  run(bot);
};

bootstrap();
