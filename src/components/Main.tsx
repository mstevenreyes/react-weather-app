import { useState, useEffect } from "react"
// import fetchWeatherData from "./Api"
import sunny from "../assets/weather-icons/animated/day.svg"
import cloudy from "../assets/weather-icons/animated/cloudy.svg"
import lightRainy from "../assets/weather-icons/animated/rainy-3.svg"
import searchIcon from "../assets/search-icon.svg"
// import moment from 'moment';


export default function Main() {
    const [input, setInput] = useState("")
    const [weatherData, setWeatherData] =  useState<any[]>([]);
    const getWeatherData = (input: string) => {

        const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${input}&days=3`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '09619a2d81msh96b54ec94a455fep1066dfjsn65238a18984e',
                'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
            }
        };

        try {
            const response =  fetch(url, options)
            .then(response => {
                return response.json()
            })
            .then(data => {
                const arr : any = [data]
                setWeatherData(arr)
            });
            return response
        } catch (error) {
            console.error(error);
        }
        console.log(weatherData);
    }

    useEffect(() => {
        getWeatherData("Manila")
    }, [])
    
    
    return (
        <>
            <main className="w-full flex h-full justify-center">
                <div className="flex w-full flex-col items-center">
                    <div className="search-bar flex items-center h-10 w-9/12 xl:w-5/12 rounded-3xl  active:outline-none outline-none text-white text-xl text-green-950 mb-5 duration-300">
                        <img className="w-7 ml-2" src={searchIcon} alt="" />
                        <input className="text-lg" placeholder="Search.." type="text" value={input} onChange={(e) => setInput(e.target.value)} />
                    </div>
                    <div className="search-button-container">
                        <button className="w-max mt-5 bg-slate-600/75 hover:bg-slate-700/90 duration-150 text-white px-4 py-1 rounded-2xl" onClick={() => {
                            getWeatherData(input);
                        }
                        }>Search</button>
                    </div>
                    {weatherData.length > 0 &&
                        <>
                            <div className="card opacity-90 mt-10 w-9/12 h-48  rounded-md">
                                <p className="text-4xl">{weatherData[0].location.name + ", " + weatherData[0].location.country}</p>
                                <div id="weather-icon-center-container" className="flex justify-center w-24 mx-auto mt-5">
                                <img className="w-24" src={ 
                                    weatherData[0].current.condition.text == "Partly cloudy" ? cloudy
                                    : weatherData[0].current.condition.text == "Light rain" ? lightRainy
                                    : weatherData[0].current.condition.text == "Clear" ? sunny
                                    : sunny} alt="weather"/>
                                    
                                    
                                </div>
                                    <p className="text-3xl 2xl:text-4xl mt-4">{weatherData[0].current.temp_c}°</p>
                                <p className="text-xl mt-2">{weatherData[0].current.condition.text}</p>
                            </div>
                        
                            {/* <div className="forecast-container flex mt-24 flex-wrap justify-center">

                                {weatherData[0].forecast.forecastday.map((forecast : any) => (
                                        <>
                                            <div className="forecast-card">
                                                <p>{ forecast.date ? moment(forecast.date).format('ddd') : "OHH" }</p>
                                                <div className="w-12 mx-auto mt-3">
                                                    <img src="./src/assets/weather-icons/cloudy@2x.png" alt="weather" />
                                                </div>
                                                <p className="mt-3">{forecast.day["avgtemp_c"]}°</p>
                                            </div>
                                        </>
                                    ))}
                                
                            </div> */}
                        </>
                    }
                </div>
            </main>
        </>
    )

  
}