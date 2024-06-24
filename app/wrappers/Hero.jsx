// we declare this component as a client component because we need to use React Hooks like useEffect and useState for data fetching and state management.
"use client";

import React, { useState, useEffect } from "react";
import styles from "./styles/styles.Hero.module.css";

// import our weather card
import WeatherCard from "../components/WeatherCard.jsx";

// import our weather api client
import { fetchWeatherForecast } from "../data/api/ForecastApi.js";
// import our localStorage caching
import {
  SaveWeatherDataToLocalStorage,
  GetWeatherDataFromLocalStorage,
  DeleteWeatherDataFromLocalStorage,
  GetSelectedCityFromLocalStorage,
} from "../data/caching/LocalStorage.js";

const Hero = () => {
  // we mount the initial stage of our component as loading as we will always need to fetch the data first
  // then later in the datafetching process we will update this loading state to false
  const [isLoading, setIsLoading] = useState(true);

  // we will use this state to store any errors that may occur during the data fetching process
  const [error, setError] = useState(null);

  // we will use this state to store the city we want to fetch the weather data for
  const [city, setCity] = useState("Prague");

  // we will use this state to store the weather data we fetch from the api
  const [weatherData, setWeatherData] = useState(null);

  // handle the caching of our weather data
  useEffect(() => {
    // we scope a local variable to store the selected city from the local storage
    const selectedCity = GetSelectedCityFromLocalStorage();

    // if the selected city is not null and the selected city is not the same as the city we are currently fetching data for
    if (selectedCity && selectedCity !== city) {
      // we set the city to the selected city
      setCity(selectedCity);

      // we clear the weather data
      setWeatherData(null); // Clear existing weather data

      // we clear the local storage data
      DeleteWeatherDataFromLocalStorage();
      // reload
    }
    // we run this useEffect everytime the city changes or on initial mount
  }, [city]);

  // we fetch the weather data
  useEffect(() => {
    // we define an async function to fetch the data
    const fetchData = async () => {
      // we set the loading state to true
      setIsLoading(true);
      // we open a local var to get any cached data if it exists
      const cachedData = GetWeatherDataFromLocalStorage();

      // if the cached data exists we set the weather data to the cached data and set the loading state to false and return
      if (cachedData) {
        setWeatherData(cachedData);
        setIsLoading(false);
        return;
      }

      // we fetch the data from the api using the fetchWeatherForecast function ONLY if we missed the cache from localStorage
      // we call our api client function to fetch the data with the city we want to fetch the data for
      // as an argument to the function
      const data = await fetchWeatherForecast({ city });

      // if the data exists we set the weather data to the data we fetched and save it to the local storage
      if (data) {
        // we set the weather data state to the data we fetched from the api
        // keying thru the json obj as data > forecast > forecastday
        setWeatherData(data.forecast.forecastday);

        // we save the weather data to the local storage

        SaveWeatherDataToLocalStorage(data.forecast.forecastday);
      } else {
        // if the data does not exist we set the error state to a fixed error string
        setError("Failed to fetch weather data");
      }

      // we set the loading state to false
      setIsLoading(false);
    };

    // we call the fetchData function
    if (city) {
      fetchData();
    }
  }, [city]); // Depend on city to refetch when it changes

  // we define an object to map the days of the week to their respective index
  const Days = {
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
    0: "Sunday",
  };

  // we define a function to return the json object per index
  const returnJsonObjectPerIndex = (index) => {
    // if the weather data exists we return the weather data at the index

    if (weatherData) {
      return weatherData[index];
    }
    return null;
  };

  return (
    <div className={styles.hero}>
      <div className={styles.weather}>
        <div className={styles.titleHeader}>
          <h3 className={styles.title7Days}>Next 7 Days</h3>
        </div>

        <div className={styles.ForecastContainer}>
          <div className={styles.ForecastCardWeekContainer}>
            {Object.values(Days).map((day, index) => {
              const dayIndex = (new Date().getDay() + index) % 7;
              const date = new Date();
              date.setDate(date.getDate() + index);
              const formattedDate = `${date.toLocaleString("default", {
                month: "long",
              })} ${date.getDate()}`;
              return (
                <WeatherCard
                  key={day}
                  DayOfWeek={Days[dayIndex]}
                  Date={formattedDate}
                  weatherData={returnJsonObjectPerIndex(index)}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
