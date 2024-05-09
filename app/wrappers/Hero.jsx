"use client";

import React, { useState, useEffect } from 'react';
import styles from './styles/styles.Hero.module.css';

// import our rain bar chart
import ChanceOfRainChart from '../components/ChanceOfRainChart.jsx';


// import our weather card
import WeatherCard from '../components/WeatherCard.jsx';

import { fetchWeatherForecast } from '../data/api/ForecastApi.js';
import { SaveWeatherDataToLocalStorage, GetWeatherDataFromLocalStorage } from '../data/caching/LocalStorage.js';


const Hero = () => {
    const [weather, setWeather] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [city, setCity] = useState('Prague');
    const [days, setDays] = useState(7);
    const [weatherData, setWeatherData] = useState(null);

    const cachedData = GetWeatherDataFromLocalStorage();

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            
            if (cachedData) {
                setWeatherData(cachedData);
                setIsLoading(false);
                return;
            }
            const data = await fetchWeatherForecast();

            if (data) {
                setWeatherData(data.forecast.forecastday);
                SaveWeatherDataToLocalStorage(data.forecast.forecastday);

            } else {
                setError('Failed to fetch weather data');
            }
            setIsLoading(false);
        };
        fetchData();
    }, []);


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