import { createSlice, createAsyncThunk  } from '@reduxjs/toolkit';
import { getWeatherByCity, getWeatherByGeolocation, getHourlyForecast, getDailyForecast } from '../api/weatherAPI';
import { WeatherState, WeatherData, HourlyWeatherProps, DailyWeatherProps }from '../interfaces/interfaces';

const initialState : WeatherState= {
    loading: false,
    data: null,  
    error: null,
    cityName: null,
    hourlyForecast: null,
    dailyForecast: null
};

//Фетчит город по поиску
export const fetchWeatherByCity = createAsyncThunk<WeatherData, string>(
  'weather/fetchWeatherByCity',
  async (city: string) => {
    const data = await getWeatherByCity(city);
    return data;
  }
);

//Фетчит город по геолокации
export const fetchWeatherByGeolocation = createAsyncThunk<WeatherData, { lat: number; lon: number }>(
  'weather/fetchWeatherByGeolocation',
  async ({ lat, lon }: { lat: number; lon: number }) => {
    const data = await getWeatherByGeolocation(lat, lon);
    return data;
  }
);

//Фетчит прогноз почасовый
export const fetchWeatherByHour = createAsyncThunk<HourlyWeatherProps, string>(
  'weather/fetchWeatherByHour',
  async (city: string) => {
    const data = await getHourlyForecast(city);
    const hourlyWeatherData: HourlyWeatherProps = {
      city: city,
      data: data, 
    };
    return hourlyWeatherData;
  }
);

//Фетчит прогноз по дню
export const fetchWeatherByDay = createAsyncThunk<DailyWeatherProps, string>(
  'weather/fetchWeatherByDay',
  async (city: string) => {
    const data = await getDailyForecast(city);
    const dailyWeatherData: DailyWeatherProps = {
      city: city,
      data: data, 
    };
    return dailyWeatherData;
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

    //BY CITY
      .addCase(fetchWeatherByCity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeatherByCity.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.data = action.payload;
        state.cityName = action.payload.name;
      })
      .addCase(fetchWeatherByCity.rejected, (state, action) => {
        state.loading = false;
        state.data = null;
        state.cityName = null;
        state.error = action.error.message || 'Ошибка загрузки данных';
        state.hourlyForecast = null;
      })

    // GEOLOCATIOM
      .addCase(fetchWeatherByGeolocation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeatherByGeolocation.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.data = action.payload;
        state.cityName = action.payload.name; 
      })
      .addCase(fetchWeatherByGeolocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка загрузки данных';
        state.data = null;
        state.cityName = null;
        state.hourlyForecast = null;
      })

    // BY HOUR
      .addCase(fetchWeatherByHour.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeatherByHour.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.hourlyForecast = action.payload.data;
      })
      .addCase(fetchWeatherByHour.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка загрузки данных';
        state.data = null;
        state.cityName = null;
        state.hourlyForecast = null;
      })

    // BY DAY
      .addCase(fetchWeatherByDay.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeatherByDay.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.dailyForecast = action.payload.data;
      })
      .addCase(fetchWeatherByDay.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка загрузки данных';
        state.data = null;
        state.cityName = null;
        state.hourlyForecast = null;
      });
  },
});



export default weatherSlice.reducer;
