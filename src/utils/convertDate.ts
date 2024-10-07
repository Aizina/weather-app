// Функция для конвертации Unix timestamp в часы и минуты
export const convertUnixTimestampToHourTime = (unixTimestamp: number): string => {
  const date = new Date(unixTimestamp * 1000);
  return date.toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' }); 
};

// Функция для конвертации Unix timestamp в дату и время в формате UTC
export const convertUnixTimestampToDateTime = (unixTimestamp: number): string => {
  const date = new Date(unixTimestamp * 1000);
  return date.toLocaleString('ru', { timeZone: 'UTC' }); 
};

// Функция для конвертации Unix timestamp в день и месяц в формате "Jul 1"
export const convertUnixTimestampToDayMonth = (unixTimestamp: number): string => {
  const date = new Date(unixTimestamp * 1000);
  const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', timeZone: 'UTC' };
  return date.toLocaleDateString('ru', options); 
};
