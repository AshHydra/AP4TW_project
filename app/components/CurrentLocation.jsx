// we import useState and useEffect 
// so we can store states and run hook functions within react components

import React, { useState, useEffect } from 'react';
import styles from './styles/styles.CurrentLocation.module.css';


// we get our icons from HeroIcons library
import { MapPinIcon } from "@heroicons/react/20/solid";
import { GetSelectedCityFromLocalStorage } from '../data/caching/LocalStorage.js';

const CurrentLocation = () => {
    // we make a local state variable called location to store the current location
    // via useEffect we will hook to call a local api to get the current location
    // we will then set the location state to the current location
    const [location, setLocation] = useState(null);

    // we will make a state to store whether we are still loading the data or not 
    // so we can amend this via our api request depending on what response we get back
    // we will always start with loading set to true because we will always start with loading whether from localStorage or an api
    // we will then set loading to false once we have the data
    const [isLoading, setIsLoading] = useState(true);

    // we want to display it in the format of  "City, Country" with the country in a bold style so we store them seperately
    // to avoid redundancy with parsing it using regex or splitting
    const [city, setCity] = useState(GetSelectedCityFromLocalStorage() || "Prague");

    useEffect(() => {
        const interval = setInterval(() => {
            const currentCity = GetSelectedCityFromLocalStorage();
            if (currentCity !== city) {
                setCity(currentCity || "Prague");
            }
        }, 250); // Recheck every 1000 milliseconds (1 second)

        return () => clearInterval(interval);
    }, [city]);
    // const [country, setCountry] = useState("Czech Republic");

    // we will concatenate it in our html code so we can wrap country in <strong> tags to make it bold


    // to make the api request we will use the npm library Axios
    // we will use the useEffect hook to make the api request


    return (
        <div className={styles.currentLocation}>
            
            <div className={styles.locationIcon}>
                {/* 
                    we render our map pin and define the size and color via tailwindcss classes 
                    also add a margin to the left of the icon to make it look better (ml-2 | margin-left 2)
                */}
                <MapPinIcon className="h-6 ml-3 text-primary" fill="var(--text-color)" />
            </div>

            <div className={styles.locationText}>
                {/* 
                    we render our location text and set the text to the location state
                    if the location state is null we will render a loading message
                */}

                {/* 
                    we render the city and country in the format of "City, Country"
                    we wrap the country in <strong> tags to make it bold
                */}
                <span className="text-lg"><strong>{city}</strong></span>

            </div>

        </div>
    );
}

export default CurrentLocation;