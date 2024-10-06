import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const useWeather = () => {
  return useSelector((state: RootState) => state.weather);
};

export default useWeather;
