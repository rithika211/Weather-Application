import { useState } from 'react';
import searchIcon from './images/search.png';

function App() {
  const apiKey = "0a4f5c7d70da823eba088b4d3a17a6b1";
  const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(false);

  async function checkWeather(city) {
    if (!city) return;
    try {
      const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
      if (response.status === 404) {
        setError(true);
        setWeather(null);
        return;
      }
      const data = await response.json();
      setWeather({
        city: data.name,
        temp: Math.round(data.main.temp),
        humidity: data.main.humidity,
        wind: data.wind.speed,  
        main: data.weather[0].main,
      });
      setError(false);
    } catch {
      setError(true);
      setWeather(null);
    }
  }

  function getWeatherIcon(main) {
    switch(main) {
      case "Clouds": return "images/clouds.png";
      case "Clear": return "images/clear.png";
      case "Rain": return "images/rain.png";
      case "Drizzle": return "images/drizzle.png";
      case "Mist": return "images/mist.png";
      default: return "images/clear.png";
    }
  }

  return (
    <div className="w-[90%] max-w-[470px] bg-gradient-to-tr from-[#00feba] to-[#5b548a] text-white mt-[100px] mx-auto rounded-[20px] py-[40px] px-[35px] text-center">
      <div className="w-full flex items-center justify-between">
        <input
          type="text"
          placeholder="Enter city name"
          spellCheck="false"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="flex-1 bg-[#ebfffc] text-gray-600 placeholder-gray-400 outline-none p-2.5 px-5 py-4 h-15 rounded-full mr-4 text-lg"
        />
        <button
          onClick={() => checkWeather(city)}
          className="bg-[#ebfffc] rounded-full h-[60px] w-[60px] flex justify-center items-center p-0 m-0 border-none shadow-none focus:outline-none"
        >
          <img src={searchIcon} alt="search" className="w-8 h-8 object-contain" />
        </button>
      </div>

      {error && <div className="mt-6 text-red-600">City not found. Please try again.</div>}

      {weather && (
        <div className="flex flex-col justify-center items-center mt-8">
          <img
            src={getWeatherIcon(weather.main)}
            alt={weather.main}
            className="w-[170px] mt-[30px]"
          />
          <h1 className="text-[80px] font-medium">{weather.temp}°C</h1>
          <h2 className="text-[50px] font-medium mt-[-10px]">{weather.city}</h2>
          <div className="flex flex-row items-center justify-between px-5 mt-8 gap-x-12">
            <div className="flex items-center text-left">
              <img src="images/humidity.png" className="w-10 mr-2.5" alt="humidity" />
              <div>
                <p className="humidity">{weather.humidity}%</p>
                <p>Humidity</p>
              </div>
            </div>
            <div className="flex items-center text-left">
              <img src="images/wind.png" className="w-10 mr-2.5" alt="wind" />
              <div>
                <p className="wind">{weather.wind} kmph</p>
                <p>Wind speed</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
