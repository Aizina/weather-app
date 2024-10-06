import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Nav from './components/Nav';
import Home from './pages/Home';
import './styles/globas.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeatherByCity, fetchWeatherByGeolocation, fetchWeatherByHour } from './features/weatherSlice';
import { AppDispatch, RootState, store } from './store/store';
import {getWeatherClass} from './utils/updateBackground'

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [city, setCity] = useState('London'); // По дефолту город Лондон
  const weather = useSelector((state: RootState) => state.weather); 
  //Обращение к состоянию погоды, чтобы оттуда получить имя города, даже если поиск введется по геолокации

  //Получаем данные о погоде
  useEffect(() => {
    const fetchInitialWeather = async () => {
      try {
        await dispatch(fetchWeatherByCity(city));
        dispatch(fetchWeatherByHour(city));
      } catch (error) {
        setCity('');
        console.error('Error fetching initial weather data:', error);
      }
    };
    fetchInitialWeather();
  }, [city, dispatch]);

  //Получение данных через поиск
  const handleOnSearch = useCallback(async (city: string) => {
    setCity(city);
    try {
      await dispatch(fetchWeatherByCity(city));
      dispatch(fetchWeatherByHour(city)); // Сразу с данными о городе автоматом прогружается почасовый прогноз
    } catch (error) {
      setCity(''); 
      console.error('Error fetching weather data by city:', error);
    }
  }, [dispatch]);

  //Получение данных через геолокацию
  const handleOnGeolocation = useCallback(async (lat: number, lon: number) => {
    try {
      await dispatch(fetchWeatherByGeolocation({ lat, lon }));
      const updatedCityName = store.getState().weather.cityName; // Получаем название города из результата
      if (updatedCityName) {
        setCity(updatedCityName);
        dispatch(fetchWeatherByHour(updatedCityName));
      } else {
        console.error('City name is null');
      }
    } catch (error) {
      setCity('');
      console.error('Error fetching weather by geolocation:', error);
    }
  }, [dispatch]);

  //Функция для того, чтобы менять бэкграунд в зависимости от описания погоды
  const weatherClass = useMemo(() => {
    return weather.data ? getWeatherClass(weather.data.weather[0].main) : 'default-weather';
  }, [weather.data]);

  return (
    <div className={weatherClass}>
      <Nav onSearch={handleOnSearch} onGeolocation={handleOnGeolocation} />
      <Home 
        city={city} 
        weatherData={weather.data}
        hourlyWeatherData={weather.hourlyForecast}
        loading={weather.loading}
        error={weather.error}
      />
    </div>
  );
};

export default App;
