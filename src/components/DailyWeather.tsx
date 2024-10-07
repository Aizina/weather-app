import React from 'react';
import { DailyWeatherProps } from '../interfaces/interfaces';
import style from '../styles/DailyWeather.module.scss';
import { convertUnixTimestampToDayMonth } from '../utils/convertDate';

const DailyWeather: React.FC<DailyWeatherProps> = ({ data }) => {

  if (!data || data.length === 0) {
      return <div>No daily forecast data available</div>;
    }

    const filteredData = data.filter((_, index) => index % 8 === 0);

  return (
    <div>
      <div className={style.dailyWeatherGrid}>
        {filteredData.map((day, index)=> (
          <div key={index} className={style.dailyWeatherRow}>  
              <div className={style.dailyWeatherTimeWrap}>
                <div>{convertUnixTimestampToDayMonth(day.time)}</div>
                <img
                    src={`http://openweathermap.org/img/wn/${day.icon}@2x.png`}
                    alt={day.description}
                    className={style.dailyWeatherTimeIcon}
                />
              </div>

                <div className={style.dailyWeatherTemp}>
                {Math.round(day.temperature)}°C
                </div>
          </div>
        ))}
      </div>
    </div>
  );
  };

export default DailyWeather;