import React from 'react';
import { WeatherCardProps } from '../interfaces/interfaces'
import style from '../styles/WeatherCard.module.scss';
import { convertUnixTimestampToDateTime, convertUnixTimestampToHourTime } from '../utils/convertDate';

//Компонент для отоброжения даты
const LocalTime: React.FC<{ time: number, className : string }> = ({ time, className }) => {
  return <span className={className}>{convertUnixTimestampToDateTime(time)}</span>;
};

//Компонент для отоброжения времени
const HourTime: React.FC<{time: number, className : string}> = ({ time, className }) => {
  return <span className={className}> {convertUnixTimestampToHourTime(time)}</span>
};

//Компонент для отображения общих данных о погоде
const WeatherCard: React.FC<WeatherCardProps> = ({           
  city, temperature, description, time, temp_min, temp_max, pressure, feels_like, humidity,
  visibility, sunrise, sunset, wind
}) => {
  
  return (
    <div className={style.mainWrap}>
      <div className={style.mainInfoWrap}>
        <p> {Math.round(temperature)}°C</p> 
        <p>{description}</p>
        <h2>{city}</h2>
        <LocalTime time={time} className={style.MainInfo__Text}/> 
      </div>
      
      <div className={style.additionalInfoWrap}>
        <img src='/icons/sunrise.png' className={style.additionalInfo__Icons}/>
        <HourTime time={sunrise} className={style.additionalInfo__Text}/> 
        <span className={style.additionalInfo__Lines}> | </span>
        <img src='/icons/sunset.png' className={style.additionalInfo__Icons}/>
        <HourTime time={sunset} className={style.additionalInfo__Text}/>    
        <span className={style.additionalInfo__Lines}> | </span>
        <span className={style.additionalInfo__Text}>Макс: {temp_max}°C </span>
        <span className={style.additionalInfo__Lines}> | </span>
        <span className={style.additionalInfo__Text}>Мин: {temp_min}°C </span>
      </div>
      

      <div className={style.detailedInfoWrap}>
        <div> 
          <img src='/icons/temperature.png' className={style.detailedInfo__Icons}/> 
          <span className={style.detailedInfo__Text}>Ощущается как: {feels_like}°C</span>
        </div>
        <div>
          <img src='/icons/barometer.png' className={style.detailedInfo__Icons}/> 
          <span className={style.detailedInfo__Text}>Давление: {pressure} hPa</span>
        </div>
        <div>
          <img src='/icons/moisture.png' className={style.detailedInfo__Icons}/> 
          <span className={style.detailedInfo__Text}>Влажность: {humidity}%</span>
        </div>
        <div>
          <img src='/icons/eye.png' className={style.detailedInfo__Icons}/> 
          <span className={style.detailedInfo__Text}>Видимость: {visibility} метров</span>  
        </div>
        <div>
          <img src='/icons/wind.png' className={style.detailedInfo__Icons}/> 
          <span className={style.detailedInfo__Text}>Скорость ветра: {wind} км/час </span>  
        </div>
      </div>
    </div>
  );
};


export default WeatherCard;
