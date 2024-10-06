//Функция для обновления класса, чтобы менять бэкграунд
export const getWeatherClass = (weather: string): string => {
    switch (weather.toLowerCase()) {
      case 'clear':
        return 'clear-weather';
      case 'clouds':
        return 'cloudy-weather';
      case 'rain':
        return 'rainy-weather';
      case 'snow':
        return 'snowy-weather';
      case 'thunderstorm':
        return 'stormy-weather';
      default:
        return 'default-weather';
    }
  };
  