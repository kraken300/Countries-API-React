import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const CountryDetail = ({ countries }) => {
  const { cca3 } = useParams();
  const country = countries.find((c) => c.cca3 === cca3);
  const navigate = useNavigate();

  if (!country) {
    return <div className="text-center">Country not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 bg-gray-200 dark:bg-gray-800 text-black dark:text-white px-4 py-2 rounded"
      >
        Back
      </button>

      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="w-full md:w-1/2">
          <img
            src={country.flags.svg}
            alt={`${country.name.common} flag`}
            className="w-full h-auto max-w-md mx-auto object-contain"
          />
        </div>

        <div className="w-full md:w-1/2">
          <h2 className="text-2xl font-bold mb-4">{country.name.common || 'Unknown Country'}</h2>
          <p className="mb-2">Official Name: {country.name.official || 'N/A'}</p>
          <p className="mb-2">Population: {country.population ? country.population.toLocaleString() : 'N/A'}</p>
          <p className="mb-2">Region: {country.region || 'N/A'}</p>
          <p className="mb-2">Subregion: {country.subregion || 'N/A'}</p>
          <p className="mb-2">Capital: {country.capital || 'N/A'}</p>
          <p className="mb-2">Area: {country.area ? country.area.toLocaleString() : 'N/A'} km²</p>
        </div>
      </div>
    </div>
  );
};

export default CountryDetail;
