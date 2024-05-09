"use client";

import React, { useState, useEffect } from 'react';
import styles from './styles/styles.Hero.module.css';

// import our weather card
import WeatherCard from '../components/WeatherCard.jsx';

import { fetchWeatherForecast } from '../data/api/ForecastApi.js';
import { SaveWeatherDataToLocalStorage, GetWeatherDataFromLocalStorage, DeleteWeatherDataFromLocalStorage, GetSelectedCityFromLocalStorage } from '../data/caching/LocalStorage.js';


const Hero = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [city, setCity] = useState('Prague');
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        const selectedCity = GetSelectedCityFromLocalStorage();
        if (selectedCity && selectedCity !== city) {
            setCity(selectedCity);
            setWeatherData(null); // Clear existing weather data
            DeleteWeatherDataFromLocalStorage();
        }
    }, [city]);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const cachedData = GetWeatherDataFromLocalStorage();

            if (cachedData) {
                setWeatherData(cachedData);
                setIsLoading(false);
                return;
            }

            const data = await fetchWeatherForecast({city});
            if (data) {
                setWeatherData(data.forecast.forecastday);
                SaveWeatherDataToLocalStorage(data.forecast.forecastday);
            } else {
                setError('Failed to fetch weather data');
            }
            setIsLoading(false);
        };

        if (city) {
            fetchData();
        }
    }, [city]); // Depend on city to refetch when it changes

    const Days = {
        1: "Monday",
        2: "Tuesday",
        3: "Wednesday",
        4: "Thursday",
        5: "Friday",
        6: "Saturday",
        0: "Sunday",
    }

    const returnJsonObjectPerIndex = (index) => {
        if (weatherData) {
            return weatherData[index];
        }
        return null;
    }
    

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
                            const formattedDate = `${date.toLocaleString('default', { month: 'long' })} ${date.getDate()}`;
                            return <WeatherCard key={day} DayOfWeek={Days[dayIndex]} Date={formattedDate} weatherData={returnJsonObjectPerIndex(index)} />;
                        })}
                    </div>
            

                    

                </div>

                

            </div>

        </div>
    );
}

export default Hero;