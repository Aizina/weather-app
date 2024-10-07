import React, { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeatherByDay } from '../features/weatherSlice';
import { AppDispatch, RootState, store } from '../store/store';
import HourlyWeather from './HourlyWeather';
import DailyWeather from './DailyWeather';
import { HourlyWeatherProps } from '../interfaces/interfaces';
import style from '../styles/WeatherForecast.module.scss';

//Компонент для отображения прогноза погоды
const WeatherForecast: React.FC<HourlyWeatherProps> = ({ city, data }) => {
  const [forecastType, setForecastType] = useState<'hourly' | 'daily'>('hourly');
  const dispatch = useDispatch<AppDispatch>();
  const dailyForecast = useSelector((state: RootState) => state.weather.dailyForecast);

  //Функция для изменения состояния, чтобы показывать или почасовой прогноз или прогноз на неделю
  const handleForecastTypeChange = (type: 'hourly' | 'daily') => {
    if (type === 'daily' && city) {
      const dailyForecast = store.getState().weather; //Получаем данные из состояния, чтобы лишний раз не фетчить
      if (!dailyForecast.dailyForecast || dailyForecast.cityName !== city) {
        dispatch(fetchWeatherByDay(city));
      }
    }
    setForecastType(type); 
  };
  
//Показывает почасовой или дневной прогноз погоды в зависимости от того, что выбрал юзер
  const renderedForecast = useMemo(() => {
    if (forecastType === 'hourly') {
      return data ? <HourlyWeather city={city} data={data} /> : <p>Нет данных о прогнозе на сегодняшний день</p>;
    }
    if (forecastType === 'daily') {
      return dailyForecast && dailyForecast.length > 0 ? (
        <DailyWeather city={city} data={dailyForecast} />
      ) : (
        <p>Нет данных о прогнозе на 5 дней.</p>
      );
    }
  }, [forecastType, data, dailyForecast, city]); 

  return (
    <div className={style.weatherForecastDiv}>
      <button onClick={() => handleForecastTypeChange('hourly')} className={`${style.weatherForecastButton} ${forecastType === 'hourly' ? style.active : ''}`}>Почасовой прогноз</button>
      <button onClick={() => handleForecastTypeChange('daily')} className={`${style.weatherForecastButton} ${forecastType === 'daily' ? style.active : ''}`}>Прогноз на 5 дней</button>
      {renderedForecast}
    </div>
  );
};

export default WeatherForecast;
