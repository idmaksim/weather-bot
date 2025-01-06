import { Service } from "typedi";
import { MyContext } from "../../types/context";

@Service()
export class MainService {
  constructor() {}

  private async createKeyboard() {
    return {
      keyboard: [[{ text: "📍 Отправить геопозицию", request_location: true }]],
      resize_keyboard: true,
    };
  }

  async handleStart(ctx: MyContext) {
    await ctx.reply(
      "Привет! Нажмите на кнопку ниже, чтобы отправить свою геопозицию",
      {
        reply_markup: await this.createKeyboard(),
      }
    );
  }
}
