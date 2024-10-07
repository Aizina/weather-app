import React, { useState, useCallback } from 'react';
import { NavProps } from '../interfaces/interfaces';
import style from '../styles/Nav.module.scss';

const Nav: React.FC<NavProps> = ({ onSearch, onGeolocation }) => {
  const [city, setCity] = useState('');
  const [searchMethod, setSearchMethod] = useState<'search' | 'geolocation' | ''>(''); // Состояние для отслеживания метода

  // Функция для поиска
  const handleSearch = useCallback(() => {
    const trimmedCity = city.trim();
    if (trimmedCity) {
      onSearch(trimmedCity);
      setCity('');
      setSearchMethod('search');
    }
  }, [city, onSearch]);

  // Функция для геолокации
  const handleGeolocation = useCallback(() => {
    const userConfirmed = window.confirm('Разрешите использовать вашу геопозицию?');

    if (userConfirmed) {
      if (!navigator.geolocation) {
        alert("Ваш браузер не поддерживает геопозицию");
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          onGeolocation(latitude, longitude);
          setSearchMethod('geolocation'); 
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              alert('Отказано в доступе к геопозиции.');
              break;
            case error.POSITION_UNAVAILABLE:
              alert('Геопозиция недоступна.');
              break;
            case error.TIMEOUT:
              alert('Время запроса истекло.');
              break;
            default:
              alert('Неизвестная ошибка.');
              break;
          }
          console.error('Ошибка получения геолокации:', error.message);
        }
      );
    } else {
      alert('Отказано в доступе к геопозиции. Пожалуйста, введите город вручную.');
    }
  }, [onGeolocation]);

  return (
    <nav className={style.nav}>
      <input
        type="text"
        placeholder="Введите название города..."
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

      {/* Сообщение пользователю о методе поиска */}
      {searchMethod === 'search' && <div className={style.searchInfo}>Данные отображены через поиск</div>}
      {searchMethod === 'geolocation' && <div className={style.searchInfo}>Данные отображены через геопозицию</div>}
    </nav>
  );
};

export default Nav;
