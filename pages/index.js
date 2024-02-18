import Image from "next/image";
import { useEffect, useState } from "react";

const api = {
  key: process.env.NEXT_PUBLIC_OPENWEATHER_KEY,
  base: "https://api.openweathermap.org/data/2.5/",
};

export default function Home() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `${api.base}weather?q=${search}&units=metric&APPID=${api.key}`
      );
      const data = await response.json();
      setSearch("");
      if (data) {
        // console.log(data);
        setWeather(data);
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <>
      <header>
        <h1>weather APP</h1>
        {/* Search Box */}
        <div>
          <input
            type="text"
            placeholder="Search city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        {typeof weather.main !== "undefined" ? (
          <>
            {/* Location */}
            <p>{weather.name ? weather.name : ""}</p>
            {/* Temperature */}
            <p>{weather.main.temp ? weather.main.temp : 0}°C</p>
            {/* Condition */}
            <p>
              {weather.weather[0].main ? weather.weather[0].main : ""}(
              {weather.weather[0].description
                ? weather.weather[0].description
                : ""}
              )
            </p>
            <p>
              {weather.main.feels_like
                ? "Feels Like: " + weather.main.feels_like + " °C"
                : ""}
            </p>
            <p>
              {weather.main.humidity
                ? "Humidity: " + weather.main.humidity + " %"
                : ""}
            </p>
            <p>
              {weather.wind.speed ? "Wind: " + weather.wind.speed + " km/h" : ""}
            </p>
          </>
        ) : (
          ""
        )}
      </header>
    </>
  );
}
