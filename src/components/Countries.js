import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CountryCard from './CountryCard';

const Countries = () => {
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [sortByPopulation, setSortByPopulation] = useState(false);
  const [sortByRegion, setSortByRegion] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await axios.get('https://restcountries.eu/rest/v2/all');
      setCountries(res.data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const onChangeInput = (e) => {
    setInputValue(e.target.value);
  };

  const onChangeCheckbox = (e) => {
    setSortByPopulation(!sortByPopulation);
  };

  const handleSelect = (e) => {
    setSortByRegion(e.target.value);
  };

  const compareFunc = (a, b) => {
    if (sortByPopulation) {
      return b.population - a.population;
    }
    return 0;
  };

  const filteredCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(inputValue.toLowerCase()) &&
      country.region.toLowerCase().includes(sortByRegion.toLowerCase())
  );

  return (
    <div className='container'>
      <div className='search-bar'>
        <div>
          <input
            type='text'
            placeholder='Search for a country...'
            value={inputValue}
            onChange={onChangeInput}
          />
        </div>
        <div>
          <select onChange={handleSelect}>
            <option value=''>Filter by Region</option>
            <option value='africa'>Africa</option>
            <option value='america'>America</option>
            <option value='asia'>Asia</option>
            <option value='europe'>Europe</option>
            <option value='oceania'>Oceania</option>
          </select>
        </div>
      </div>
      <div>
        <div className='search-filter'>
          <label htmlFor='population'>Sort by population</label>
          <input
            type='checkbox'
            checked={sortByPopulation}
            onChange={onChangeCheckbox}
          />
        </div>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className='countries'>
          {filteredCountries.length < 1 ? (
            <p>No country</p>
          ) : (
            filteredCountries
              .sort(compareFunc)
              .map((country) => (
                <CountryCard country={country} key={country.alpha3Code} />
              ))
          )}
        </ul>
      )}
    </div>
  );
};

export default Countries;
