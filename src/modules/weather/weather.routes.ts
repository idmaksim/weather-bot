import { Bot } from "grammy";
import { MyContext } from "../../types/context";
import Container from "typedi";
import { WeatherService } from "./weather.service";

export const initWeatherRoutes = (bot: Bot<MyContext>) => {
  const service = Container.get(WeatherService);

  bot.on("message:location", async (ctx) => {
    await service.handleLocation(ctx);
  });
};
