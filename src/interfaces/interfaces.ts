//Главный интефейс
export interface WeatherData {
  name: string;
  main: {
    temp: number;
    temp_min: number,
    temp_max: number,
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  sys: {
    sunrise: number;
    sunset: number;
  };
  weather: {
      main: string;
      icon: string;
      description: string | any;
  }[];
  wind: {
    speed: number;
  }
  dt: number;
  visibility: string;

}

//Интерфейс состояния
export interface WeatherState {
  loading: boolean;
  data: WeatherData | null;
  error: string | null;
  cityName: string | null;
  hourlyForecast : HourlyWeatherData[] | null;
  dailyForecast: DailyWeatherData[] | null;
}

//Интерфейс основных данных о погоде
export interface WeatherCardProps {
  city: string; 
  temperature: number; 
  description: string; 
  time: number; 
  temp_min: number, 
  temp_max: number, 
  pressure: number; 
  feels_like: number; 
  humidity: number; 
  visibility: string;
  sunrise: number;
  sunset: number;
  wind: number;
}

//Интерфейс навигации
export interface NavProps {
  onSearch: (city: string) => void;
  onGeolocation: (latitude: number, longitude: number) => void; 
}

//Интерфейс прогноза по часам
export interface HourlyWeatherData {
  time: number;        
  temperature: number; 
  icon: string;        
  description: string;
}

export interface HourlyWeatherProps {
  city: string;
  data: HourlyWeatherData[]; 
}

//Интерфейс прогноза по дням
export interface DailyWeatherData {
  time: number;        
  temperature: number; 
  icon: string;        
  description: string;
}

export interface DailyWeatherProps {
  city: string;
  data: DailyWeatherData[];
}

//Интерфейс данных основной страницы
export interface HomeProps {
  city: string;
  weatherData: any; 
  hourlyWeatherData: any; 
  loading: boolean;
  error: string | null;
}
