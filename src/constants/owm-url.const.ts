import { format } from "util";
import { Location } from "../types/location";

export const WEATHER_MAP_URL =
  "https://api.openweathermap.org/data/2.5/weather?lat=%s&lon=%s&appid=%s&units=metric&lang=ru";

export const formatWeatherUrl = (
  location: Location,
  apiKey: string
): string => {
  return format(WEATHER_MAP_URL, location.latitude, location.longitude, apiKey);
};
