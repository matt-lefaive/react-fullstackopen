import React from 'react';

const CountryButton = ({ name, onClick }) => {
    return (
      <div>
        {name} <button value={name} onClick={onClick}>show</button>
      </div>
    )
}

export default CountryButton;