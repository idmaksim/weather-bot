import Container from "typedi";
import { WeatherService } from "./weather.service";
import { HttpService } from "../http/http.service";
import { MyContext } from "../../types/context";
import { BOT_MESSAGES } from "../../constants/messages.const";

describe("WeatherService", () => {
  let weatherService: WeatherService;
  let httpService: HttpService;

  const moscowLocation = {
    latitude: 55.7558,
    longitude: 37.6173,
  };

  beforeEach(() => {
    weatherService = Container.get(WeatherService);
    httpService = Container.get(HttpService);
  });

  afterEach(() => {
    Container.reset();
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(weatherService).toBeDefined();
  });

  it("should return weather data", async () => {
    const weather = await weatherService.getWeatherData(moscowLocation);
    expect(weather).toBeDefined();
    expect(weather.name).toBe("Москва");
  });

  it("should handle API errors correctly", async () => {
    jest.spyOn(httpService, "get").mockRejectedValue(new Error("API Error"));

    const ctx = {
      message: { location: moscowLocation },
      reply: jest.fn(),
    } as unknown as MyContext;

    await weatherService.handleLocation(ctx);
    expect(ctx.reply).toHaveBeenCalledWith(BOT_MESSAGES.WEATHER_ERROR);
  });

  it("should request location when not provided", async () => {
    const ctx = {
      message: { location: undefined },
      reply: jest.fn(),
    } as unknown as MyContext;

    await weatherService.handleLocation(ctx);
    expect(ctx.reply).toHaveBeenCalledWith(BOT_MESSAGES.SEND_LOCATION, {
      parse_mode: "Markdown",
    });
  });
});
