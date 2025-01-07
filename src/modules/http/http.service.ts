import axios from "axios";
import { Service } from "typedi";
import { WeatherResponse } from "../../types/weather-response";
import logger from "../../config/logger";

@Service()
export class HttpService {
  async get(url: string): Promise<WeatherResponse> {
    try {
      logger.info("Отправка HTTP запроса", { url });
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      logger.error("Ошибка HTTP запроса", {
        url,
        error: error instanceof Error ? error.message : "Unknown error",
        stack: error instanceof Error ? error.stack : undefined,
      });
      throw new Error(`Ошибка при запросе к API: ${error}`);
    }
  }
}
