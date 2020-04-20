import React from 'react';

const CountryCard = ({ country }) => {
  return (
    <li className='country'>
      <div>
        <img src={country.flag} alt={country.name} />
        <h2>{country.name}</h2>
        <ul>
          <li>
            Population: <span>{country.population.toLocaleString()}</span>
          </li>
          <li>
            Region: <span>{country.region}</span>
          </li>
          <li>
            Capital: <span>{country.capital}</span>
          </li>
        </ul>
      </div>
    </li>
  );
};

export default CountryCard;
