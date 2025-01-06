import axios from "axios";
import { formatWeatherUrl } from "../../constants/owm-url.const";
import { Service } from "typedi";

@Service()
export class WeatherService {
  constructor(private readonly openWeatherApiKey: string) {}

  private async getWeatherData(location: {
    latitude: number;
    longitude: number;
  }) {
    const url = formatWeatherUrl(location, this.openWeatherApiKey);
    const response = await axios.get(url);
    return response.data;
  }
}
