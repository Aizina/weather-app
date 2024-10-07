import React from 'react';
import { HomeProps } from '../interfaces/interfaces';
import WeatherCard from '../components/WeatherCard';
import WeatherForecast from '../components/WeatherForecast';
import style from '../styles/Home.module.scss';

//Получаем все данные из App и передаем их в WeatherCard и WeatherForecast для дальнейшего отображения.
const Home: React.FC<HomeProps> = ({ city, weatherData, hourlyWeatherData, loading, error, dailyWeatherData }) => {
  return (
    <div className={style.HomeWrap}>
      
      {loading && <p className={style.loading}>Loading...</p>}
      
      {weatherData && (
        <WeatherCard
          city={weatherData.name}
          temperature={weatherData.main.temp}
          description={weatherData.weather[0].description}
          time={weatherData.dt}
          temp_min={weatherData.main.temp_min}
          temp_max={weatherData.main.temp_max}
          pressure={weatherData.main.pressure}
          feels_like={weatherData.main.feels_like}
          humidity={weatherData.main.humidity}
          visibility={weatherData.visibility}
          sunrise={weatherData.sys.sunrise}
          sunset={weatherData.sys.sunset}
          wind = {weatherData.wind.speed}
        />
      )}
      
      {hourlyWeatherData && city && (
        <WeatherForecast city={city} hourlyData={hourlyWeatherData} dailyData={dailyWeatherData} />
      )}

    
    {error && <p>Error: {error}</p>}
    </div>
  );
};

export default Home;
