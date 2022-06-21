import React from "react";
import axios from "axios";
import { useState } from "react";
import bgImage from './assets/airplane-bg.jpg'
import swal from '@sweetalert/with-react'
function App() {


  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=f0757b15a310ecddc88fd06b34194653`

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
        .catch(error => {
          swal(<p className="text-center">Hubo errores, indique su ciudad</p>)
        })
      setLocation('')



    }

  }


  return (
    <div className=" w-full  h-screen relative ">
      <div className="absolute bg-gray-900/40 w-full h-full"><img src={bgImage} className='w-full h-screen object-cover mix-blend-overlay' />
      </div>

      <div className="relative max-w-[700px] flex flex-col items-center mx-auto h-full p-4" >

        <input value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Enter City'
          type='text'
          className=" rounded-lg p-4 bg-slate-800/50 w-[90%] text-white mx-auto"
        />

        <div className=" w-full h-[700px] flex flex-col justify-between py-12 text-white px-10">
          <div className="top">
            <div className="location">
              <p className="text-xl font-bold">{data.name}, {data.sys.country}</p>
            </div>
            <div className="temp flex justify-between">
              {data.main ? <h1 className="text-7xl sm:text-8xl my-4 font-bold">{data.main.temp.toFixed()}°C</h1> : null}


              <div className=" flex justify-start items-center">
                {data.weather ? <p className="rotate-[270deg] origin-center font-semibold text-2xl">{data.weather[0].main}</p> : null}

              </div>
            </div>
          </div>

          {data.main != undefined &&
            <div className="bottom flex justify-evenly text-2xl bg-slate-700/50 rounded-lg mt-4 w-full mx-auto p-4 text-center">
              {data.main ?
                <div className="">
                  <p className="font-bold">{data.main.feels_like.toFixed()}°C</p>
                  <p className="text-base">Feels Like</p>

                </div> : null}
              {data.main ?
                <div className="humidity">
                  <p className="font-bold">{data.main.humidity}%</p>
                  <p className="text-base">Humidity</p>
                </div>
                : null}
              {data.wind ?
                <div className="wind t">
                  <p className="font-bold"> {data.wind.speed} m/s</p>
                  <p className="text-base">Wind Speed</p>
                </div>
                : null
              }

            </div>}

        </div>
      </div>
    </div >
  );
}

export default App;
