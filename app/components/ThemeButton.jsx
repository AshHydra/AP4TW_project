import React, { useState, useEffect } from "react";
import { getTheme, setTheme } from '../hooks/darkmode/DarkModeCookie';

const ThemeButton = () => {
    // SVG icon for light mode
    const LightModeIcon =
        '<svg width="22px" height="22px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 3V4M12 20V21M4 12H3M6.31412 6.31412L5.5 5.5M17.6859 6.31412L18.5 5.5M6.31412 17.69L5.5 18.5001M17.6859 17.69L18.5 18.5001M21 12H20M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z" stroke="#414141" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>';

    // SVG icon for dark mode
    const DarkModeIcon =
        '<svg width="22px" height="22px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3.32031 11.6835C3.32031 16.6541 7.34975 20.6835 12.3203 20.6835C16.1075 20.6835 19.3483 18.3443 20.6768 15.032C19.6402 15.4486 18.5059 15.6834 17.3203 15.6834C12.3497 15.6834 8.32031 11.654 8.32031 6.68342C8.32031 5.50338 8.55165 4.36259 8.96453 3.32996C5.65605 4.66028 3.32031 7.89912 3.32031 11.6835Z" stroke="#e0e0e0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>';

    // State to manage the current theme (dark or light)
    const [darkMode, setDarkMode] = useState(getTheme());
    // State to manage the current icon based on the theme
    const [darkModeIcon, setDarkModeIcon] = useState(null);

    // useEffect hook to set the initial theme and icon when the component mounts
    useEffect(() => {
        const currentTheme = getTheme();
        setDarkMode(currentTheme);
        setDarkModeIcon(currentTheme === "light" ? LightModeIcon : DarkModeIcon);
    }, []);

    // Function to toggle between dark and light mode
    function toggleDarkMode() {
        const newTheme = darkMode === "dark" ? "light" : "dark";
        setTheme(newTheme);
        setDarkMode(newTheme);
        setDarkModeIcon(newTheme === "dark" ? DarkModeIcon : LightModeIcon);
    }

    return (
        <div>
            <button
                type="button"
                id="dropdown-notifications"
                className="inline-flex items-center justify-center gap-1  px-3 py-2 text-sm font-semibold leading-5 text-neutral-800 button-color-naked hover:bg-[var(--button-hover-color)] transition focus:outline-none focus:ring-2  focus:ring-indigo-500 rounded-md"
                onClick={() => toggleDarkMode()}
            >
                <div
                    dangerouslySetInnerHTML={{ __html: darkModeIcon }}
                ></div>
            </button>
        </div>
    );
}

export default ThemeButton;