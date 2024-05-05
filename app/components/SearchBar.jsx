import React, { useState, useEffect } from 'react';
import styles from './styles/styles.SearchBar.module.css';

import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';

import { getTheme } from '../hooks/darkmode/DarkModeCookie';


const SearchBar = () => {
    const [theme, setTheme] = useState(getTheme());
    const [search, setSearch] = useState('');

    const handleSearch = (e) => {
        setSearch(e.target.value);
    }

    const [stylingDark, setStylingDark] = useState("text-light");
    const [stylingLight, setStylingLight] = useState("text-primary");

    useEffect(() => {
        if (theme === 'dark') {
            setStylingDark("text-light");
            setStylingLight("text-primary");
        } else {
            setStylingDark("text-dark");
            setStylingLight("text-primary");
        }
    }, [theme]);
    

    return (
        <div className={styles.search}>
            <MagnifyingGlassIcon className={`size-6 ml-3 ${theme === 'dark' ? stylingDark : stylingLight}`} />


            <input 
                type="text" 
                placeholder="Search for a city.." 
                className={styles.searchInput} 
            />

        </div>  




    );
}

export default SearchBar;