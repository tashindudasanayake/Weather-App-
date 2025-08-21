import React, { useState } from "react";
import { FaSearch, FaWind } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import "../index.css";

const API_KEY = "53d691ddd392e3fa19dc64cc8eba0027"; // Replace with your key

const demoWeather = {
  name: "Colombo",
  main: {
    temp: 30,
    humidity: 78,
  },
  weather: [
    {
      description: "partly cloudy",
      icon: "02d",
    },
  ],
  wind: {
    speed: 10,
  },
};

function CardWeather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(demoWeather);

  const fetchWeather = async () => {
    if (!city.trim()) return;

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();
      if (data.cod === 200) {
        setWeather(data);
      } else {
        alert("City not found!");
      }
    } catch (error) {
      alert("Error fetching weather data.", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-500 flex items-center justify-center p-6">
      <div className="bg-white/20 backdrop-blur-xl p-8 rounded-3xl w-full max-w-md text-white shadow-2xl">
        <div className="flex items-center bg-white/30 rounded-full px-4 py-2 mb-6">
          <input
            type="text"
            placeholder="Enter city..."
            className="bg-transparent focus:outline-none flex-grow text-black placeholder-white text-lg"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button
            onClick={fetchWeather}
            className="text-white hover:text-yellow-300 ml-2"
            title="Search"
          >
            <FaSearch size={20} />
          </button>
        </div>

        {weather && (
          <div className="text-center">
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
              alt="Weather Icon"
              className="mx-auto mb-2"
            />
            <h1 className="text-5xl font-bold mb-2">{Math.round(weather.main.temp)}°C</h1>
            <h2 className="text-2xl font-semibold">{weather.name}</h2>
            <p className="text-sm italic text-white/80 capitalize mb-4">
              {weather.weather[0].description}
            </p>

            <div className="grid grid-cols-2 gap-4 mt-6 text-sm">
              <div className="flex items-center justify-center bg-white/10 p-3 rounded-xl">
                <WiHumidity size={28} className="mr-2" />
                <span>{weather.main.humidity}%</span>
              </div>
              <div className="flex items-center justify-center bg-white/10 p-3 rounded-xl">
                <FaWind size={22} className="mr-2" />
                <span>{weather.wind.speed} km/h</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CardWeather;
