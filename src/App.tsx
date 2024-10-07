import React, { useState, useEffect } from 'react';
import Nav from './components/Nav';
import Home from './pages/Home';
import './styles/globas.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeatherByCity, fetchWeatherByDay, fetchWeatherByGeolocation, fetchWeatherByHour } from './features/weatherSlice';
import { AppDispatch, RootState, store } from './store/store';
import { getWeatherClass } from './utils/updateBackground';

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [city, setCity] = useState('London');
  const weather = useSelector((state: RootState) => state.weather);

  // Получение данных о погоде при загрузке страницы
  useEffect(() => {
    dispatch(fetchWeatherByCity(city)).then(() => {
      dispatch(fetchWeatherByHour(city));
      dispatch(fetchWeatherByDay(city));
    }).catch((error) => {
      console.error('Error fetching initial weather data:', error);
    });
  }, [city, dispatch]);

  // Поиск погоды по названию города
  const handleOnSearch = (city: string) => {
    setCity(city);
    dispatch(fetchWeatherByCity(city))
      .then(() => {
        dispatch(fetchWeatherByHour(city));
        dispatch(fetchWeatherByDay(city));
      })
      .catch((error) => {
        console.error('Error fetching weather data by city:', error);
      });
  };

  // Поиск погоды по геолокации
  const handleOnGeolocation = (lat: number, lon: number) => {
    dispatch(fetchWeatherByGeolocation({ lat, lon }))
      .then(() => {
        const updatedCityName = store.getState().weather.cityName; 
        if (updatedCityName) {
          setCity(updatedCityName);
          dispatch(fetchWeatherByHour(updatedCityName));
          dispatch(fetchWeatherByDay(city));
        } else {
          console.error('City name is null');
        }
      })
      .catch((error) => {
        console.error('Error fetching weather by geolocation:', error);
      });
  };

  // Обновление класса для фона в зависимости от погоды
  const weatherClass = weather.data ? getWeatherClass(weather.data.weather[0].main) : 'default-weather';

  return (
    <div className={weatherClass}>
      <Nav onSearch={handleOnSearch} onGeolocation={handleOnGeolocation} />
      <Home 
        city={city} 
        weatherData={weather.data}
        hourlyWeatherData={weather.hourlyForecast}
        loading={weather.loading}
        error={weather.error}
        dailyWeatherData={weather.dailyForecast}
      />
    </div>
  );
};

export default App;
