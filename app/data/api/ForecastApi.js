import axios from 'axios';




const fetchWeatherForecast = async ({city}) => {
  try {
    const response = await axios.get('https://api.weatherapi.com/v1/forecast.json', {
      params: {
        key: 'a9b882b8a47547b4aa065049240905',
        q: city,
        days: 7,
        aqi: 'no',
        alerts: 'no'
      }
    });
    return response.data;

  } catch (error) {
    console.error('Failed to fetch weather data:', error);
    return null;
  }
};

export { fetchWeatherForecast };