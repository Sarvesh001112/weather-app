import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeToDark, changeToLight } from './redux/Slices/themeSlice';
import { IoIosMoon } from 'react-icons/io';
import { BsSunFill } from 'react-icons/bs';
import { HiLocationMarker } from 'react-icons/hi';
import moment from 'moment';
import light from './asset/light.png';
import dark from './asset/dark.png';
import './App.css';

function App() {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState("");
  const [temp, setTemp] = useState("");
  const themeColor = useSelector((state) => state.theme.themeColor);
  const dispatct = useDispatch();
  useEffect(() => {
    if (!localStorage.getItem("location")) {
      localStorage.setItem('location', "Mumbai");
      setLocation("Mumbai")
    }
    else
      fetchData();
  }, [location]);
  const fetchData = () => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${localStorage.getItem('location')}&appid=bd5e378503939ddaee76f12ad7a97608&units=metric`)
      .then((response) => response.json())
      .then((data) => {
        if(data.cod===200)
          setData(data)
        else
          setData(null)
        console.log(data)
      })
      .catch((err) => setData(null));
  }
  return (
    <>
      <div className='body-container' style={{ backgroundImage: themeColor === "#FFFFFF" ? `url(${light})` : `url(${dark})` }}>
        <nav>
          <p>Weather App</p>
          <form onSubmit={(e) => {
            e.preventDefault();
            localStorage.setItem('location', temp)
            setLocation(temp);
            setTemp("");
          }}>
            <input type={'text'} value={temp} required onChange={(e) => {
              setTemp(e.target.value);
            }} placeholder="Enter your location" />
            <button type='submit' style={{ color: `${themeColor}` }}>SEARCH</button>
          </form>
          <span>
            {
              themeColor === "#FFFFFF" ?
                <IoIosMoon className='theme-button' style={{ fill: "#fff" }} onClick={() => {
                  dispatct(changeToDark())
                }} />
                :
                <BsSunFill className='theme-button' style={{ fill: "#000" }} onClick={() => {
                  dispatct(changeToLight())
                }} />
            }</span>
        </nav>
        {
          data!==null?
            <>
              <h2 className='location-name'><HiLocationMarker />{`${data?.name},${data?.sys?.country}`}</h2>
              <main>
                <div className='left-container'>
                  <img src={data?`https://openweathermap.org/img/wn/${data?.weather[0].icon}@4x.png`:""} alt="weather-logo" />
                  <h2 style={{ color: `${themeColor}` }}>{data?.weather[0].main}</h2>
                  <h4 style={{ color: `${themeColor}` }}>{data?.weather[0].description}</h4>
                  <p style={{ color: `${themeColor}` }}>{data?.main.temp}<sup>.</sup>C</p>
                  <div className='minmax-container' style={{ color: `${themeColor}` }}>
                    <div className='min'>
                      <p>MIN</p>
                      <p>{data?.main.temp_min}<sup>.</sup>C</p>
                    </div>
                    <div className='max'>
                      <p>MIN</p>
                      <p>{data?.main.temp_max}<sup>.</sup>C</p>
                    </div>
                  </div>
                </div>
                <div className='right-container' style={{ color: `${themeColor}` }}>
                  <div className='sun-container'>
                    <div className='sun'>
                      <p>SUN RISE</p>
                      <p>{moment.utc(data?.sys.sunrise,'X').add(data?.timezone,'seconds').format('HH:mm a')}</p>
                    </div>
                    <div className='sun'>
                      <p>SUN SET</p>
                      <p>{moment.utc(data?.sys.sunset,'X').add(data?.timezone,'seconds').format('HH:mm a')}</p>
                    </div>
                  </div>
                  <div className='others-container'>
                    <div className='others'>
                      <p>Real Feel</p>
                      <p>{data?.main.feels_like}<sup>.</sup>C</p>
                    </div>
                    <div className='others'>
                      <p>Humidity</p>
                      <p>{data?.main.humidity}%</p>
                    </div>
                    <div className='others'>
                      <p>Wind Speed</p>
                      <p>{data?.wind.speed} m/s</p>
                    </div>
                    <div className='others'>
                      <p>Pressure</p>
                      <p>{data?.main.pressure}hPa</p>
                    </div>
                  </div>
                </div>
              </main>
              <p className='footer'><a href='https://bhstechie.netlify.app' target={'_blank'} rel="noreferrer">Developed by Sarvesh Lowanshi</a></p>
            </>
            :
            <main style={{height:"80%",display:"flex",flexDirection:"column",justifyContent:"center",color: 'lightgreen'}}>
              <h1>City not Found</h1>
              <h4>Please Change your Location</h4>
            </main>
        }
      </div>
    </>
  );
}

export default App;
