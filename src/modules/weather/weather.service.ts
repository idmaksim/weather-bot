import axios from "axios";
import { formatWeatherUrl } from "../../constants/owm-url.const";
import { Service } from "typedi";
import { MyContext } from "../../types/context";
import { HttpService } from "../http/http.service";
import config from "../../config/config";
import { Location } from "../../types/location";

@Service()
export class WeatherService {
  constructor(private readonly httpService: HttpService) {}

  private async getWeatherData(location: Location) {
    const url = formatWeatherUrl(location, config.OPENWEATHER_API_KEY);
    return await this.httpService.get(url);
  }

  async handleLocation(ctx: MyContext) {
    try {
      const location = ctx.message?.location;
      await this.ensureLocationExists(ctx, location);
      const weatherData = await this.getWeatherData(location as Location);
      await ctx.reply(this.formatWeatherData(weatherData));
    } catch (error) {
      await ctx.reply("Извините, не удалось получить информацию о погоде");
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
      await ctx.reply("Пожалуйста, отправьте свою геопозицию");
      return;
    }
  }

  private formatWeatherData(weatherData: any) {
    return `
    Погода в указанной локации:
    🌡 Температура: ${Math.round(weatherData.main.temp)}°C
    💨 Ветер: ${weatherData.wind.speed} м/с
    💧 Влажность: ${weatherData.main.humidity}%
    🌤 ${weatherData.weather[0].description}
    `;
  }
}
