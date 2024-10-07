import axios from 'axios';
import { WeatherData, HourlyWeatherData, DailyWeatherData }from '../interfaces/interfaces';

const API_KEY = '1a902c1df837020dadf8c1a47ba13d1d'; 
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

//Запрос по поиску
export const getWeatherByCity = async (city: string): Promise<WeatherData> => {
  const response = await axios.get(`${BASE_URL}/weather`, {
    params: {
      q: city,
      appid: API_KEY,
      units: 'metric',
      lang: 'ru'
    },
  });
  console.log("response for city is", response, response.data);
  return response.data;
};

//Запрос по геолокации
export const getWeatherByGeolocation = async (lat: number, lon: number): Promise<WeatherData> => {
  const response = await axios.get(`${BASE_URL}/weather`, {
    params: {
      lat,
      lon,
      appid: API_KEY,
      units: 'metric',
      lang: 'ru'
    },
  });
  return response.data;
};

//Запрос по дням
export const getDailyForecast = async (city: string): Promise<DailyWeatherData[]> => {
  const response = await axios.get(`${BASE_URL}/forecast`, {
    params: {
      q: city,
      appid: API_KEY,
      units: 'metric',
      lang: 'ru'
    },
  });
  console.log("response for 5 days is", response, response.data, response.data.list);
 
  return response.data.list.map((item: any) => ({
    time: item.dt, 
    temperature: item.main.temp, 
    icon: item.weather[0].icon, 
    description: item.weather[0].description, 
  }));
};

//Запрос по часам
export const getHourlyForecast = async (city: string): Promise<HourlyWeatherData[]> => {
  const response = await axios.get(`${BASE_URL}/forecast`, {
    params: {
      q: city,
      appid: API_KEY,
      units: 'metric',
      cnt: 8,
      lang: 'ru'
    },
  });
  console.log("response for ${city} is", response, response.data, response.data.list);
  
  return response.data.list.map((item: any) => ({
    time: item.dt, 
    temperature: item.main.temp, 
    icon: item.weather[0].icon, 
    description: item.weather[0].description, 
  }));
};
