import Image from "next/image";
import { useState } from "react";
import { FaWind, FaTemperatureEmpty } from "react-icons/fa6";
import { MdOutlineWaterDrop } from "react-icons/md";

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
      <div className="weather-app">
        {/* <h1>Weather APP</h1> */}
        {/* Search Box */}
        <div className="search-section">
          <input
            type="text"
            placeholder="Search city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="search-btn" onClick={handleSearch}>
            Search
          </button>
        </div>
        {typeof weather.main !== "undefined" ? (
          <>
            <div className="city-section">
              <h2 className="city">{weather.name ? weather.name : ""}</h2>
            </div>
            <div className="temperature-info">
              <div className="temp">
                {weather.main.temp ? weather.main.temp : 0}°C
              </div>
              <div className="description">
                <div className="description-text">
                  {weather.weather[0].main ? weather.weather[0].main : ""} (
                  {weather.weather[0].description
                    ? weather.weather[0].description
                    : ""}
                  )
                </div>
              </div>
            </div>

            <div className="additional-info">
              <div className="wind-info">
                <div>
                  <FaWind size={25} />
                  <div className="wind-label">Wind</div>
                  <div className="wind-speed">
                    {weather.wind.speed ? weather.wind.speed + " km/h" : ""}
                  </div>
                </div>
              </div>
              <div className="humidity-info">
                <div>
                  <MdOutlineWaterDrop size={30} />
                  <p className="humidity-label">Humidity</p>
                  <div className="humidity">
                    {weather.main.humidity ? weather.main.humidity + " °C" : ""}
                  </div>
                </div>
              </div>
              <div className="feels-like-info">
                <div>
                  <FaTemperatureEmpty size={25} />
                  <p className="feels-like-label">Feels Like</p>
                  <div className="feels-like">
                    {weather.main.feels_like
                      ? weather.main.feels_like + " °C"
                      : ""}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
