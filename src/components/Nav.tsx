import React, { useState, useCallback } from 'react';
import { NavProps } from '../interfaces/interfaces';
import style from '../styles/Nav.module.scss';

const Nav: React.FC<NavProps> = ({ onSearch, onGeolocation }) => {
  const [city, setCity] = useState('');

  //Функция для поиска
  const handleSearch = useCallback(() => {
    const trimmedCity = city.trim();
    if (trimmedCity) {
      onSearch(trimmedCity);
      setCity(''); 
    }
  }, [city, onSearch]);

  //Функция для геолокации
  const handleGeolocation = useCallback(() => {
    const userConfirmed = window.confirm('Do you allow the app to access your geolocation?');
  
    if (userConfirmed) {
      if (!navigator.geolocation) {
        alert("Geolocation is not supported by your browser.");
        return;
      }
  
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          onGeolocation(latitude, longitude); 
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              alert('Permission to access geolocation was denied.');
              break;
            case error.POSITION_UNAVAILABLE:
              alert('Position is unavailable.');
              break;
            case error.TIMEOUT:
              alert('The request to get user location timed out.');
              break;
            default:
              alert('An unknown error occurred.');
              break;
          }
          console.error('Ошибка получения геолокации:', error.message);
        }
      );
    } else {
      alert('You denied access to your geolocation. You will have to input your city to see weather data.');
    }
  }, [onGeolocation]);

  return (
    <nav className={style.nav}>
      <input
        type="text"
        placeholder="Enter city..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className={style.input}
      />
      <button type="button" onClick={handleSearch} className={style.navIconsDiv}>
        <img src='/icons/search.png' alt='Search' className={style.navIcons} />
      </button>
      <button type="button" onClick={handleGeolocation} className={style.navIconsDiv}>
        <img src='/icons/location.png' alt='Location' className={style.navIcons} />
      </button>
    </nav>
  );
};

export default Nav;
