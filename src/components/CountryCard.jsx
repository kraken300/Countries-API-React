import React from 'react';
import { useNavigate } from 'react-router-dom';

const CountryCard = ({ country }) => {
  const navigate = useNavigate();

  const handleDetailClick = () => {
    if (country && country.cca3) {
      navigate(`/country/${country.cca3}`);
    }
  };

  if (!country) {
    return <div className="border rounded-lg p-4 bg-gray-200 dark:bg-gray-700">No country data available.</div>;
  }

  return (
    <div className="border rounded-lg p-4 shadow-lg bg-white dark:bg-gray-800 dark:text-white transition-colors duration-300">
    
      <div className="w-full h-52 md:h-44 overflow-hidden object-covers object-center mb-2">
        <img 
          src={country.flags.svg} 
          alt={`${country.name.common} flag`} 
          className="w-full h-full object-cover"
        />
      </div>

      <h3 className="font-semibold mb-2">{country.name.common || 'Unknown Country'}</h3>
      <p className="mb-2">Population: {country.population ? country.population.toLocaleString() : 'N/A'}</p>
      <p className="mb-4">Region: {country.region || 'N/A'}</p>
      <button 
        onClick={handleDetailClick} 
        className="bg-blue-500 text-white rounded px-4 py-2"
      >
        Show Details
      </button>
    </div>
  );
};

export default CountryCard;
