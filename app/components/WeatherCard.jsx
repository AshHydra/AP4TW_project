"use client";

import React, { useState, useEffect } from 'react';

import { SaveWeatherDataToLocalStorage, GetWeatherDataFromLocalStorage } from '../data/caching/LocalStorage.js';


const WeatherCard = ({ 
    DayOfWeek = "Monday", 
    Temperature = 0,
    Date = "July 29",
    weatherData
}) => {
    const cachedData = GetWeatherDataFromLocalStorage();

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [avgHumidity, setAvgHumidity] = useState(null);
    const [avgTempC, setAvgTempC] = useState(null);
    const [maxTempC, setMaxTempC] = useState(null);
    const [uv, setUv] = useState(null);
    const [condition, setCondition] = useState(null);
    const [conditionIcon, setConditionIcon] = useState(null);

    useEffect(() => {
        if (weatherData && weatherData.day) {
            setAvgHumidity(weatherData.day.avghumidity);
            setAvgTempC(weatherData.day.avgtemp_c);
            setMaxTempC(weatherData.day.maxtemp_c);
            setUv(weatherData.day.uv);
            setCondition(weatherData.day.condition.text);
            setConditionIcon(weatherData.day.condition.icon);
        }
        setIsLoading(false);
    }, [weatherData]);
    
    return (
        <div className="flex flex-col items-center p-8 rounded-md w-60 sm:px-12 dark:bg-gray-50 dark:text-gray-800">
	<div className="text-center">
		<h2 className="text-xl font-semibold text-primary ">{DayOfWeek}</h2>
		<p className="text-sm text-primary ">{Date}</p>
	</div>

	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-32 h-32 p-6 text-primary  fill-current">
		<path d="M256,104c-83.813,0-152,68.187-152,152s68.187,152,152,152,152-68.187,152-152S339.813,104,256,104Zm0,272A120,120,0,1,1,376,256,120.136,120.136,0,0,1,256,376Z"></path>
		<rect width="32" height="48" x="240" y="16"></rect>
		<rect width="32" height="48" x="240" y="448"></rect>
		<rect width="48" height="32" x="448" y="240"></rect>
		<rect width="48" height="32" x="16" y="240"></rect>
		<rect width="32" height="45.255" x="400" y="393.373" transform="rotate(-45 416 416)"></rect>
		<rect width="32.001" height="45.255" x="80" y="73.373" transform="rotate(-45 96 96)"></rect>
		<rect width="45.255" height="32" x="73.373" y="400" transform="rotate(-45.001 96.002 416.003)"></rect>
		<rect width="45.255" height="32.001" x="393.373" y="80" transform="rotate(-45 416 96)"></rect>
	</svg>


	<div className="mb-2 text-3xl font-semibold text-primary">{avgTempC}°
		<span className="mx-1 font-normal text-primary">/</span>{maxTempC}°
	</div>
	<p className="text-primary">Partly cloudy</p>
</div>
    )
}

export default WeatherCard;