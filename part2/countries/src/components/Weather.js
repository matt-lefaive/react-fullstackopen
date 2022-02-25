import React from 'react';

const Weather = ({ city, temperature, icon, wind }) => {
    return (
      <div>
        <h2>Weather in {city}</h2>
        <div>temperature {(temperature - 273.15).toFixed(2)} Celcius</div>
        <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="null"/>
        <div>wind {wind} m/s</div>
      </div>
    )
}

export default Weather;