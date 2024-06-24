"use client";

import React, { useState, useEffect } from 'react';


const WeatherCard = ({ 
    DayOfWeek = "Monday", 
    Temperature = 0,
    Date = "July 29",
    weatherData,
}) => {
    // bunch of states to store the weather data

    const [isLoading, setIsLoading] = useState(true);
    const [avgHumidity, setAvgHumidity] = useState(null);
    const [avgTempC, setAvgTempC] = useState(null);
    const [maxTempC, setMaxTempC] = useState(null);
    const [uv, setUv] = useState(null);
    const [condition, setCondition] = useState(null);
    const [conditionIcon, setConditionIcon] = useState(null);

    // we use the useEffect hook to update the state of our component
    useEffect(() => {
        if (weatherData && weatherData.day) {
            // we set the state of our component to the data we fetched
            setAvgHumidity(weatherData.day.avghumidity);
            setAvgTempC(weatherData.day.avgtemp_c);
            setMaxTempC(weatherData.day.maxtemp_c);
            setUv(weatherData.day.uv);
            setCondition(weatherData.day.condition.text);
            setConditionIcon(weatherData.day.condition.icon);
        }

        // we set the loading state to false
        setIsLoading(false);


    }, [weatherData]);
    

    // the api returns conditionIcon, a cdn image link, we use it to display the weather icon so we check if it exists and then display it straight away,
    // if it doesn't exist we display a placeholder image

    return (
        <div className="flex flex-col items-center p-8 rounded-md w-60 sm:px-12 border-2">
	<div className="text-center">
		<h2 className="text-xl font-semibold text-primary ">{DayOfWeek}</h2>
		<p className="text-sm text-primary ">{Date}</p>
	</div>

    <img src={condition
        ? `https:${conditionIcon}`
        : 'https://via.placeholder.com/100x100?text=Weather'
    } alt="Weather icon" className="w-32 h-32 p-6 text-primary fill-current" />


	<div className="mb-2 text-3xl font-semibold text-primary">{avgTempC}°
		<span className="mx-1 font-normal text-primary">/</span>{maxTempC}°
	</div>
	<p className="text-primary">{condition}</p>
</div>
    )
}

export default WeatherCard;