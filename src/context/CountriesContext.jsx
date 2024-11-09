import { createContext, useContext, useEffect, useState } from "react";

const CountriesContext = createContext(null);

export const CountriesProvider = ({ children }) => {

    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleTheme = () => {
        const htmlElement = document.documentElement;
        if (htmlElement.classList.contains('dark')) {
            htmlElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            setIsDarkMode(false);
        } else {
            htmlElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            setIsDarkMode(true);
        }
    };

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            document.documentElement.classList.add(savedTheme);
            setIsDarkMode(savedTheme === 'dark');
        }
    }, []);

    const value = { isDarkMode, toggleTheme };

    return (
        <CountriesContext.Provider value={value}>
            {children}
        </CountriesContext.Provider>
    );
}

export const useCountries = () => {
    return useContext(CountriesContext);
}