import axios from 'axios';

const API_KEY = '5d170f1d'; // Используйте переменные окружения
const BASE_URL = 'https://www.omdbapi.com/';

export default {
  async search(query: string, page = 1) {
    const params = {
      apikey: API_KEY,
      s: query,
      page,
    };
    
    const response = await axios.get(BASE_URL, { params });
    return response.data;
  }
};