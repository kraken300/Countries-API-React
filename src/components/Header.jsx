import React from 'react'

const Header = ({ toggleTheme, isDarkMode }) => {
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