import React, { useEffect, useState } from 'react';
import { WeatherInfo as WeatherInfoInterface } from './App.model';
import './App.css';

export function App(): JSX.Element {
  const [location, setLocation] = useState<GeolocationPosition | undefined>(undefined);
  const [weatherInfo, setWeatherInfo] = useState<WeatherInfoInterface | undefined>(undefined);
  const [isCelcius, setIsCelcius] = useState<boolean>(true);

  useEffect(
    () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(position);
        },
      );
    },
    [],
  );

  useEffect(
    () => {
      if (location === undefined) {
        return;
      }
      const { latitude } = location.coords;
      const { longitude } = location.coords;

      const fetchUrl = new URL('https://weather-proxy.freecodecamp.rocks/api/current');
      const urlParams: Record<string, string> = {
        lat: latitude.toString(),
        lon: longitude.toString(),
      };

      fetchUrl.search = new URLSearchParams(urlParams).toString();

      const fetchData = async () => {
        const response = await fetch(fetchUrl.toString());
        const result: WeatherInfoInterface = await response.json();
        setWeatherInfo(result);
      };

      fetchData();
    },
    [location],
  );

  function onClick() {
    if (isCelcius) {
      setIsCelcius(false);
    } else {
      setIsCelcius(true);
    }
  }

  function convertCelciusToFarenheit(degrees: number) {
    const result = (degrees * (9 / 5)) + 32;
    return Math.round((result + Number.EPSILON) * 100) / 100;
  }

  return (
    <div className="App">
      {
        weatherInfo && (
          <div>
            <img src={weatherInfo?.weather[0].icon} alt="Weather Icon" />
            <div>
              Temperature:
              {' '}
              {isCelcius ? weatherInfo.main.temp : convertCelciusToFarenheit(weatherInfo.main.temp)}
              {' '}
              {isCelcius ? 'Degrees Celcius' : 'Degrees Farenheit'}
            </div>
            <div>
              What it Feels Like:
              {' '}
              {isCelcius ? weatherInfo.main.feels_like : convertCelciusToFarenheit(weatherInfo.main.feels_like)}
              {' '}
              {isCelcius ? 'Degrees Celcius' : 'Degrees Farenheit'}
            </div>
            <button type="button" onClick={onClick}>
              Switch to
              {' '}
              {isCelcius ? 'Farenheit' : 'Celcius'}
            </button>
          </div>
        )
      }
    </div>
  );
}
