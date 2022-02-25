import React from 'react';

const DetailedCountry = ({ name, capital, area, languages, flag }) => {
    return (
      <div>
        <h2>{name}</h2>
        <div>capital {capital}</div>
        <div>area {area}</div>
        <div>
          <h3>languages:</h3>
          <ul>
            {Object.keys(languages).map((lang, i) => <li key={i}>{languages[lang]}</li>)}
          </ul>
        </div>
        <div>
          <img src={flag} alt="flag"/>
        </div>
      </div>
    )
}

export default DetailedCountry;