import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [weather, setWeather] = useState("");
  const [temperature, setTemperature] = useState(0);
  const [cityName, setCityName] = useState("");

  const savePositionToState = (position) => {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
  };

  const fetchWeather = async () => {
    try {
      await window.navigator.geolocation.getCurrentPosition(savePositionToState);
      const res = await axios.get(
        `https.api.openweathermap.org/data/2.5/weather?lat=$latitude&lon=$longitudeappid=59cc34f169f6d5788ffd70587fbdb24c`
      );
      setTemperature(res.data.main.temp);
      setCityName(res.data.name);
      setWeather(res.data.weather[0].main);
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchWeather();    
  }, [latitude, longitude]);

  return ( 
  <div className='app'>
    <div className ='app__container'>
      <h1>{cityName}</h1>
      <h2>{temperature}°C</h2>
      <h2>{weather}</h2>
    </div>
  </div>
  );
}

export default App;
