import React, { useState } from 'react';
import HourlyWeather from './HourlyWeather';
import DailyWeather from './DailyWeather';
import { WeatherForecastProps } from '../interfaces/interfaces';
import style from '../styles/WeatherForecast.module.scss';

const WeatherForecast: React.FC<WeatherForecastProps> = ({ city, hourlyData, dailyData }) => {
  const [forecastType, setForecastType] = useState<'hourly' | 'daily'>('hourly');
  
  // Функция для изменения состояния
  const handleForecastTypeChange = (type: 'hourly' | 'daily') => {
    setForecastType(type);
  };

  // Показываем почасовой или дневной прогноз в зависимости от выбора
  const renderedForecast = forecastType === 'hourly' ? (
    hourlyData ? <HourlyWeather city={city} data={hourlyData} /> : <p>Нет данных о почасовом прогнозе</p>
  ) : (
    dailyData ? <DailyWeather city={city} data={dailyData} /> : <p>Нет данных о прогнозе на 5 дней.</p>
  );

  return (
    <div className={style.weatherForecastDiv}>
      <div className={style.buttonGroup}>
        <button
          onClick={() => handleForecastTypeChange('hourly')}
          className={`${style.weatherForecastButton} ${forecastType === 'hourly' ? style.active : ''}`}
        >
          Почасовой прогноз
        </button>
        <button
          onClick={() => handleForecastTypeChange('daily')}
          className={`${style.weatherForecastButton} ${forecastType === 'daily' ? style.active : ''}`}
        >
          Прогноз на 5 дней
        </button>
      </div>
      {renderedForecast}
    </div>
  );
};

export default WeatherForecast;
