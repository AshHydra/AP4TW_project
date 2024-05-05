"use client";

import React, { useState } from 'react';
import styles from './styles/styles.Hero.module.css';

// import our rain bar chart
import ChanceOfRainChart from '../components/ChanceOfRainChart.jsx';


const Hero = () => {
    const [weather, setWeather] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const [selectedDay, setSelectedDay] = useState(0);

    // useEffect(() => {
    //     fetchWeather();
    // }, []);

    return (
        <div className={styles.hero}>
        

            
            <div className={styles.weather}>
                <div className={styles.titleHeader}>
                    <h3 className={styles.titleToday}>Today</h3>
                    <h3 className={styles.titleTomorrow}>Tomorrow</h3>
                    <h3 className={styles.title7Days}>Next 7 Days</h3>
                </div>

            </div>

            <div className={styles.chanceOfRain}>
                <div className={styles.chanceOfRainHeader}>
                    <h3 className={styles.chanceOfRainTitle}>Chance of Rain</h3>
                </div>

                <div className={styles.chanceOfRainChart}>
                    <ChanceOfRainChart />
                </div>

            </div>


        </div>
    );
}

export default Hero;