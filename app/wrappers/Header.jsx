"use client";

import React from 'react';
import styles from './styles/styles.Header.module.css';

// importing our searchbar component
import SearchBar from '../components/SearchBar.jsx';

// importing our darkmode component (switch for themes)
import DarkMode from '../components/DarkMode.jsx';

// importing our location component
import Location from '../components/CurrentLocation.jsx';




const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.location}>
                {/*  render our location component */}
                <Location />
            </div>

            <div className={styles.search}>
                {/*  render our searchbar */}
                <SearchBar />
            </div>

            <div className={styles.theme}>
                {/*  render our darkmode component */}
                <DarkMode />
            </div>

        </header>
    );
};

export default Header;

