import { format } from "util";

export const WEATHER_MAP_URL =
  "https://api.openweathermap.org/data/2.5/weather?lat=%s&lon=%s&appid=%s&units=metric&lang=ru";

export const formatWeatherUrl = (
  location: { latitude: number; longitude: number },
  apiKey: string
): string => {
  return format(WEATHER_MAP_URL, location.latitude, location.longitude, apiKey);
};
