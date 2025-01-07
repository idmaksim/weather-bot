import axios from "axios";
import { Service } from "typedi";

@Service()
export class HttpService {
  async get(url: string) {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw new Error(`Ошибка при запросе к API: ${error}`);
    }
  }
}
