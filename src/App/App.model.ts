interface WeatherMainInfo {
  feels_like: number;
  humidity: number;
  pressure: number;
  temp: number;
  temp_max: number;
  temp_min: number;
}

interface Weather {
  description: string;
  icon: string;
  id: number;
  main: string;
}

interface Wind {
  deg: number;
  gust: number;
  speed: number;
}

export interface WeatherInfo {
  main: WeatherMainInfo;
  name: string;
  weather: ReadonlyArray<Weather>;
  wind: Wind;
}
