import { Bot } from "grammy";
import { MyContext } from "../../types/context";
import Container from "typedi";
import { MainService } from "./main.service";

export const initMainRoutes = (bot: Bot<MyContext>) => {
  const service = Container.get(MainService);

  bot.command("start", async (ctx) => {
    await service.handleStart(ctx);
  });
};
