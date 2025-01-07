import { Service } from "typedi";
import { MyContext } from "../../types/context";
import { BOT_MESSAGES, KEYBOARD_BUTTONS } from "../../constants/messages.const";
import { format } from "util";

@Service()
export class MainService {
  constructor() {}

  private async createKeyboard() {
    return {
      keyboard: [
        [{ text: KEYBOARD_BUTTONS.SEND_LOCATION, request_location: true }],
      ],
      resize_keyboard: true,
    };
  }

  async handleStart(ctx: MyContext) {
    const userName = ctx.from?.first_name || "пользователь";
    const message = format(BOT_MESSAGES.WELCOME, userName);
    await ctx.reply(message, {
      reply_markup: await this.createKeyboard(),
      parse_mode: "Markdown",
    });
  }
}
