"use client";

import React from 'react';
import styles from './styles/styles.Header.module.css';

// importing our searchbar component
import DropDownMenu from '../components/dropDownMenu';

// importing our darkmode component (switch for themes)
import ThemeButton from '../components/ThemeButton.jsx';

// importing our location component
import Location from '../components/CurrentLocation.jsx';




const Header = () => {
    return (
        // render our header component
        <header className={styles.header}>
            <div className={styles.location}>
                {/*  render our location component */}
                <Location />
            </div>

             <div className={styles.search}>
           
                < DropDownMenu />
            </div> 

            <div className={styles.theme}>
                {/*  render our darkmode component */}
                <div className={styles.innerWrapperTheme}>
                    <ThemeButton />
                </div>

            </div>

        </header>
    );
};

export default Header;

