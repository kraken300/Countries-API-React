import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CountryCard from './components/CountryCard';
import CountryDetail from './components/CountryDetail';
import Header from './components/Header';
import { CountriesProvider } from './context/CountriesContext';
import { useFetch } from './hooks/useFetch';

const App = () => {

  const { countries, loading, error } = useFetch(`https://restcountries.com/v3.1/all`);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectTerm, setSelectTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="text-center text-4xl">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  console.log(selectTerm, sortBy);

  return (
    <CountriesProvider>
      <Router>
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-white transition-colors duration-300">
          <div className="container mx-auto p-4">
            <Header />

            <div className="mb-4">
              <input
                type="text"
                placeholder="Search for a country"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded dark:bg-gray-800 dark:text-white dark:border-gray-700"
              />

              <select
                value={selectTerm}
                onChange={(e) => setSelectTerm(e.target.value)}
                className='dark:text-white dark:bg-black'
              >
                <option value="" hidden>Filter by Region</option>
                <option value="">All Regions</option>
                <option value="Antarctic">Antarctic</option>
                <option value="Asia">Asia</option>
                <option value="Africa">Africa</option>
                <option value="Europe">Europe</option>
                <option value="Americas">Americas</option>
                <option value="Oceania">Oceania</option>
              </select>

              <input
                type="radio"
                value="population"
                onChange={(e) => setSortBy(e.target.value)}
                checked={sortBy === "population"}
              /> Population (asc)

              <input
                type="radio"
                value="name"
                onChange={(e) => setSortBy(e.target.value)}
                checked={sortBy === "name"}
              /> By name (asc)
            </div>

            <Routes>
              <Route
                path="/"
                element={
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredCountries
                      .filter(country => country.region.toLowerCase().includes(selectTerm.toLowerCase()))
                      .sort(
                        (a, b) => (sortBy === "name" ? a.name.common.localeCompare(b.name.common) : b.population - a.population)
                      )
                      .map((country) => (
                        <CountryCard key={country.cca3} country={country} />
                      ))}
                  </div>
                }
              />
              <Route path="/country/:cca3" element={<CountryDetail />} />
            </Routes>
          </div>
        </div>
      </Router>
    </CountriesProvider>
  );
};

export default App;
