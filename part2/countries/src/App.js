import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DetailedCountry from './components/DetailedCountry';
import CountryButton from './components/CountryButton';
import Filter from './components/Filter';
import Weather from './components/Weather';

const openWeatherMapAPIKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;

const App = () => {
  const [filter, setFilter] = useState('');
  const [allCountries, setAllCountries] = useState([]);
  const [countries, setCountries] = useState([]);
  const [weather, setWeather] = useState({main:null, weather:[null], wind:null});

  // Get all countries
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setAllCountries(response.data)
      })
  }, [])

  // Update list of countries to show
  useEffect(() => {
    const countriesToDisplay = allCountries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()));
    
    setCountries(countriesToDisplay);
    
    // If there is only one country, also get weather data for it's capital
    let isMounted = true;
    if (countriesToDisplay.length === 1) {
      axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${countriesToDisplay[0].capitalInfo.latlng[0]}&lon=${countriesToDisplay[0].capitalInfo.latlng[1]}&appid=${openWeatherMapAPIKey}`)
      .then(response => {
        if (isMounted) setWeather(response.data);
      });
      return () => { isMounted = false }
    }  
  }, [filter, allCountries]);


  const handleFilterChange = e => setFilter(e.target.value);

  const countryButtonOnClick = e => setFilter(e.target.value);

  if (countries.length > 10) {
    return (
      <div>
        <Filter value={filter} onChange={handleFilterChange}/>
        <div>Too many matches, specify another filter</div>
      </div>
    )
  } else if (countries.length > 1) {
    return (
      <div>
        <Filter value={filter} onChange={handleFilterChange}/>
        {countries.map((country, i) => <CountryButton key={i} name={country.name.common} onClick={countryButtonOnClick}/>)}
      </div>
    );
  } else if (countries.length === 1) {
    return (
      <div>
        <Filter value={filter} onChange={handleFilterChange}/>
        <DetailedCountry 
          name={countries[0].name.common}
          capital={countries[0].capital[0]}
          area={countries[0].area}
          languages={countries[0].languages}
          flag={countries[0].flags.png}/>
        <Weather
          city={countries[0].capital[0]}
          temperature={weather?.main?.temp}
          icon={weather?.weather[0]?.icon}
          wind={weather?.wind?.speed}/>
      </div>
    )
  } else {
    return (
      <div>
        <Filter value={filter} onChange={handleFilterChange}/>
        <div>No results found</div>
      </div>
    );
  }
}

export default App;
