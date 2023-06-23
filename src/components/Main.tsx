import { useState, useEffect } from "react"
import SearchBar from "./SearchBar"
import sunny from "../assets/weather-icons/animated/day.svg"
import cloudy from "../assets/weather-icons/animated/cloudy.svg"
import thunder from "../assets/weather-icons/animated/thunder.svg"
import overcast from "../assets/weather-icons/animated/cloudy-day-1.svg"
import lightRainy from "../assets/weather-icons/animated/rainy-3.svg"
import {Accordion, AccordionBody, AccordionHeader, AccordionItem} from "react-headless-accordion";
import moment from 'moment';

export default function Main() {
    const [weatherData, setWeatherData] =  useState<any[]>([]);
    const getWeatherDataFromComponent = (weatherApiData : any) => {
        setWeatherData(weatherApiData)
    }
   

    const weatherLogo = (weather : string) => {
        const weatherLogo = weather == "Partly cloudy" ? cloudy
        : (weather == "Light rain" || weather == "Moderate rain" || weather == "Patchy rain possible" ) ? lightRainy
        : weather == "Clear" ? sunny
        : weather == "Overcast" ? overcast
        : (weather == "Moderate or heavy rain with thunder" || weather == "Thundery outbreaks possible") ? thunder
        : sunny
        return weatherLogo
    }

    
   
    return (
        <>
            <main className="w-full flex flex-col lg:flex-row mt-10 xl:mt-0 h-full ">
                {/* left section container */}
                <section className="left-container flex flex-col order-1 lg:order-2 items-center lg:items-start lg:justify-start lg:ml-36">
                    <div className="mobile-search-bar block w-7/12 lg:w-full lg:hidden">
                        <SearchBar getWeatherDataFromComponent={ getWeatherDataFromComponent }/>
                    </div>
                    {/* Container for left side details */}
                    { (weatherData.length > 0) &&
                        <div className="card flex items-center lg:items-start  flex-col xl:justify-start xl:flex-row  opacity-95 mt-8 lg:mt-auto w-full xl:w-9/12 lg:mb-32">
                            <p className="text-6xl lg:text-8xl xl:text-9xl lg:mr-auto xl:mr-0 p-0 m-0">{weatherData[0].current.temp_c}°</p>
                            {/* Container city, name and weather text */}
                            <div className="xl:flex xl:flex-col text-center lg:text-start lg:mt-auto">
                                <p className="text-3xl lg:text-6xl xl:ml-5">{weatherData[0].location.name }</p>
                                <span className="text-sm xl:text-base hidden lg:block whitespace-nowrap xl:ml-5 xl:mb-3">{weatherData[0].current.last_updated  ? moment(weatherData[0].current.last_updated.date).format('HH:mm - dddd, D MMM \'YY') : "OHH" }</span>
                            </div>
                            {/* Weather Logo */}
                            <div id="weather-icon-center-container" className="flex flex-col justify-center items-center lg:mr-auto lg:mt-auto xl:mr-0 xl:ml-12 mt-2">
                                <img className="w-18" src={ weatherLogo(weatherData[0].current.condition.text ) } alt="weather"/>
                                 {/* Weather text */}
                                <p className="text-base mb-3 xl:tracking-wide whitespace-nowrap">{weatherData[0].current.condition.text}</p>
                            </div>
                        </div>
                    }
                </section>
                {/* Right Section container */}
                <section className="right-section-container order-2 lg:order-1  xl:h-full">
                    <div className="hidden lg:block">
                        <SearchBar getWeatherDataFromComponent={ getWeatherDataFromComponent }/>
                    </div>
                    <div className="forecast-container tracking-wide mt-12 lg:mt-24 w-10/12 lg:w-9/12 mx-auto">
                        {weatherData.length > 0 &&
                            <>
                                <div className="current-forecast-data text-start ">
                                    <p>Weather Details</p>
                                    <ul className="opacity-95 text-white mt-6 md:mt-10">
                                        <li>Cloudy: <span className="float-right">{weatherData[0].current.cloud} %</span> </li>
                                        <li className="mt-5">Humidity: <span className="float-right">{weatherData[0].current.humidity} %</span> </li>
                                        <li className="mt-5">Wind: <span className="float-right">{weatherData[0].current.wind_kph} km/h</span> </li>
                                    </ul>
                                </div>
                                <hr className="mt-10 opacity-30"/>
                                <Accordion>
                                    { weatherData[0].forecast.forecastday.slice(1).map((forecast : any) => (
                                        <div key={forecast.date} className="forecast-card">
                                            <AccordionItem>
                                                    <AccordionHeader className={`flex flex-row text-start opacity-90 w-full`}>
                                                                <span className="">{ forecast.date ? moment(forecast.date).format('dddd') : "" }</span>
                                                                <span className="ml-auto pl-12">{forecast.day.condition.text + " - " +forecast.day["avgtemp_c"]}°</span>
                                                    </AccordionHeader>
                                                    <AccordionBody>
                                                        <div className="flex flex-wrap">
                                                            <p className="w-full flex"><span>Avg. Temperature: </span><span className="ml-auto pl-11">{forecast.day.avgtemp_c}°</span></p>
                                                            <p className="w-full flex"><span>Humidity: </span><span className="ml-auto pl-11">{forecast.day.avghumidity}%</span></p>
                                                            <p className="w-full flex"><span>Max Wind: </span><span className="ml-auto pl-11">{forecast.day.maxwind_kph} km/h</span></p>
                                                        </div>
                                                    </AccordionBody>
                                            </AccordionItem>
                                        </div>
                                    ))}
                                </Accordion>
                            </>
                        }
                    </div>
                </section>
            </main>
        </>
    )

  
}



