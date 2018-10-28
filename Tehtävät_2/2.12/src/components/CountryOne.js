import React from 'react';

const CountryOne = ({ country }) => {
    return (
        <div>
            <h2>{country.name}</h2>
            <p>
                capital: {country.capital}
            </p>
            <p>
                population: {country.population}
            </p>
            <p>
                <img src={country.flag} alt='Country flag' width='200'/>
            </p>
        </div>
    )
}

export default CountryOne