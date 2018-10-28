import React from 'react';

const Country = ({ country, handleClick }) => {
    return (
        <div onClick={() => handleClick(country.name)}>
            {country.name}
        </div>
    )
}

export default Country