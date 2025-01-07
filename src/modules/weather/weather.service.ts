import { formatWeatherUrl } from "../../constants/owm-url.const";
import { Service } from "typedi";
import { MyContext } from "../../types/context";
import { HttpService } from "../http/http.service";
import config from "../../config/config";
import { Location } from "../../types/location";
import { format } from "util";
import { BOT_MESSAGES } from "../../constants/messages.const";
import { WeatherResponse } from "../../types/weather-response";
import logger from "../../config/logger";
import { MOSCOW_TIMEZONE } from "../../constants/timezone";

@Service()
export class WeatherService {
  constructor(private readonly httpService: HttpService) {}

  async getWeatherData(location: Location) {
    const url = formatWeatherUrl(location, config.OPENWEATHER_API_KEY);

    logger.info("Запрос погоды", {
      latitude: location.latitude,
      longitude: location.longitude,
    });

    return this.httpService.get(url);
  }

  async handleLocation(ctx: MyContext) {
    try {
      const location = ctx.message?.location;
      await this.ensureLocationExists(ctx, location);
      const weatherData = await this.getWeatherData(location as Location);

      logger.info("Погода успешно получена", {
        city: weatherData.name,
        temperature: weatherData.main.temp,
      });

      await ctx.reply(this.formatWeatherData(weatherData), {
        parse_mode: "Markdown",
      });
    } catch (error) {
      logger.error("Ошибка при получении погоды", {
        error: error instanceof Error ? error.message : "Unknown error",
        stack: error instanceof Error ? error.stack : undefined,
      });
      await ctx.reply(BOT_MESSAGES.WEATHER_ERROR);
    }
  }

  private async ensureLocationExists(
    ctx: MyContext,
    location?: {
      latitude: number;
      longitude: number;
    }
  ) {
    if (!location) {
      await ctx.reply(BOT_MESSAGES.SEND_LOCATION, {
        parse_mode: "Markdown",
      });
      return;
    }
  }

  private formatWeatherData(data: WeatherResponse) {
    const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString(
      "ru-RU",
      {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: MOSCOW_TIMEZONE,
      }
    );

    const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString(
      "ru-RU",
      {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: MOSCOW_TIMEZONE,
      }
    );

    return format(
      BOT_MESSAGES.WEATHER_TEMPLATE,
      data.name,
      Math.round(data.main.temp),
      Math.round(data.main.feels_like),
      data.wind.speed,
      data.wind.gust || data.wind.speed,
      data.main.humidity,
      (data.visibility / 1000).toFixed(1),
      data.clouds.all,
      data.weather[0].description.charAt(0).toUpperCase() +
        data.weather[0].description.slice(1),
      sunrise,
      sunset
    );
  }
}
