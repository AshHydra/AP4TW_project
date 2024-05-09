function SaveWeatherDataToLocalStorage(weatherData) {
    const now = new Date();
    const item = {
      value: weatherData,
      expiry: now.getTime() + 3600000, // 1 hour in milliseconds
    };
    localStorage.setItem('weatherData', JSON.stringify(item));
}



// had to make it check if localStorage is available because of SSR
// we want to prevent from making this a client side only app
function GetWeatherDataFromLocalStorage() {
    if (typeof localStorage !== 'undefined') {
      const itemStr = localStorage.getItem('weatherData');
      if (!itemStr) {
        return null;
      }
      const item = JSON.parse(itemStr);
      const now = new Date();
      if (now.getTime() > item.expiry) {
        localStorage.removeItem('weatherData');
        return null;
      }
      return item.value;
    }
    return null;
  }
  

function DeleteWeatherDataFromLocalStorage() {
    localStorage.removeItem('weatherData');
  }



function SaveSelectedCityToLocalStorage(city) {
    localStorage.setItem('selectedCity', city);
    DeleteWeatherDataFromLocalStorage();
    // roload
    window.location.reload();
  }

function GetSelectedCityFromLocalStorage() {
    if (typeof localStorage !== 'undefined') {
    return localStorage.getItem('selectedCity');
    }
    return null;
}





export { SaveWeatherDataToLocalStorage, GetWeatherDataFromLocalStorage, SaveSelectedCityToLocalStorage, GetSelectedCityFromLocalStorage, DeleteWeatherDataFromLocalStorage};