import dotenv from "dotenv";

dotenv.config();

export default {
  BOT_TOKEN: process.env.BOT_TOKEN as string,
  OPENWEATHER_API_KEY: process.env.OPENWEATHER_API_KEY as string,
};
