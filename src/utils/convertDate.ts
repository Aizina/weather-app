//Фунции по конвертации данных о дате и времени

export const convertUnixTimestampToHourTime = (unixTimestamp: number): string => {
    const date = new Date(unixTimestamp * 1000);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', timeZone: 'UTC'}); 
 };

export  const convertUnixTimestampToDateTime = (unixTimestamp: number): string => {
    const date = new Date(unixTimestamp * 1000); 
    console.log(unixTimestamp * 1000, date);
    return date.toUTCString(); 
};

export const convertUnixTimestampToDayMonth = (unixTimestamp: number): string => {
  const date = new Date(unixTimestamp * 1000);
  const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', timeZone: 'UTC' };
  return date.toLocaleDateString('en-US', options);
};
