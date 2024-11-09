import React from 'react'
import { useCountries } from '../context/CountriesContext'

const Header = () => {

    const { isDarkMode, toggleTheme } = useCountries();

    return (
        <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Countries</h1>
            <button
                onClick={toggleTheme}
                className="text-2xl"
            >
                {isDarkMode ? '☀️' : '🌙'}
            </button>
        </div>
    )
}

export default Header