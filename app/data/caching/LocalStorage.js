// Function to save weather data to local storage
function SaveWeatherDataToLocalStorage(weatherData) {
    // Get the current date and time
    const now = new Date();
    // Create an item object with the weather data and an expiry time of 1 hour
    const item = {
      value: weatherData,
      expiry: now.getTime() + 3600000, // 1 hour in milliseconds
    };
    // Save the item to local storage as a JSON string
    localStorage.setItem('weatherData', JSON.stringify(item));
}

// Function to get weather data from local storage
// Checks if local storage is available to support server-side rendering (SSR)
function GetWeatherDataFromLocalStorage() {
    if (typeof localStorage !== 'undefined') {
      // Get the item from local storage
      const itemStr = localStorage.getItem('weatherData');
      // If the item does not exist, return null
      if (!itemStr) {
        return null;
      }
      // Parse the item from JSON string to object
      const item = JSON.parse(itemStr);
      // Get the current date and time
      const now = new Date();
      // If the current time is greater than the expiry time, remove the item and return null
      if (now.getTime() > item.expiry) {
        localStorage.removeItem('weatherData');
        return null;
      }
      // Return the weather data
      return item.value;
    }
    // If local storage is not available, return null
    return null;
}

// Function to delete weather data from local storage
function DeleteWeatherDataFromLocalStorage() {
    // Remove the item from local storage
    localStorage.removeItem('weatherData');
}

// Function to save the selected city to local storage
function SaveSelectedCityToLocalStorage(city) {
    // Save the selected city to local storage
    localStorage.setItem('selectedCity', city);
    // Delete the weather data from local storage
    DeleteWeatherDataFromLocalStorage();
    // Reload the page
    window.location.reload();
}

// Function to get the selected city from local storage
function GetSelectedCityFromLocalStorage() {
    // Check if local storage is available
    if (typeof localStorage !== 'undefined') {
      // Get the selected city from local storage
      return localStorage.getItem('selectedCity');
    }
    // If local storage is not available, return null
    return null;
}

// Export the functions for use in other modules
export { SaveWeatherDataToLocalStorage, GetWeatherDataFromLocalStorage, SaveSelectedCityToLocalStorage, GetSelectedCityFromLocalStorage, DeleteWeatherDataFromLocalStorage};
