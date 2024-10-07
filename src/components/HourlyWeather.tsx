import React from 'react';
import { HourlyWeatherProps } from '../interfaces/interfaces';
import { convertUnixTimestampToHourTime } from '../utils/convertDate';
import style from '../styles/HourlyWeather.module.scss'; // Подключение файла стилей как модуля

const HourlyWeather: React.FC<HourlyWeatherProps> = ({data }) => {
  
  if (!data || data.length === 0) {
    return <div>No hourly forecast data available</div>;
  }

  const limitedData = data.slice(0, 8);

  return (
    <div>
      <div className={style.hourlyWeatherGrid}>
        {limitedData.map((hour, index) => (
          <div key={index} className={style.hourlyWeatherRow}>
       
            <div className={style.hourlyWeatherTimeWrap}>
              <div>{convertUnixTimestampToHourTime(hour.time)}</div>
              <img
                src={`http://openweathermap.org/img/wn/${hour.icon}@2x.png`}
                alt={hour.description}
                className={style.hourlyWeatherTimeIcon}
              />
            </div>

            <div className={style.hourlyWeatherTemp}>
              {Math.round(hour.temperature)}°C
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyWeather;
