import { useState, useEffect } from "react"
import searchIcon from "../assets/search-icon-2.svg"


const SearchBar = ( { weatherDataHandler }: any) => {
    const [input, setInput] = useState("")
    const [suggestions, setSuggestions] = useState<any[]>([])
    const getSuggestions = (suggestions : any) => {
        setSuggestions(suggestions)
    }
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
                if(!response.ok){
                    throw Error("No matching weather data")
                }
                return response.json()
            })
            .then(data => {
                const arr : any = [data]
                weatherDataHandler(arr)
            })
            .catch(err => {
                console.log(err.message)
            });
            
            return response
        } catch (error) {
            console.error(error);
        }
    }
    const autoComplete = (input: string) => {
        const url = `https://weatherapi-com.p.rapidapi.com/search.json?q=${input}`;
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
                if(!response.ok){
                    throw Error("No matching location found")
                }
                return response.json()
            })
            .then(data => {
                const arr : any = [data]
                getSuggestions(data)
            })
            .catch(err => {
                // console.log(err.message)
            })

            return response
        } catch (error) {
            // console.log(error);
        }
    }

    useEffect(() => {
        getWeatherData("Manila")
    }, [])

    const enterKeyEvent = (e: string, weather: string) => {
        if(e === "Enter"){
            getWeatherData(weather)
        }
    } 

    return (
        <div className="flex w-full flex-col items-center">
            <div className="search-bar flex items-center h-10 w-11/12 lg:w-9/12 xl:w-12/12 px-2 active:outline-none outline-none text-white text-xl duration-300">
                <input required className="text-lg placeholder-white px-1" placeholder="Search.." type="text" value={input} onChange={(e) => {
                    setInput(e.target.value) 
                    autoComplete(e.target.value)
                    } } onKeyDown={e => enterKeyEvent(e.key, input) } />
                <button className="search-button w-7 ml-2 opacity-6"  onClick={() => {
                    getWeatherData(input);
                }}  ><img src={searchIcon} alt="" /></button>
            </div>
            { suggestions.length > 0 &&
            <ul className="suggestions-box fixed mt-10 text-left cursor-default">
                {suggestions.map( (suggestion: any) => (
                    <li className="suggestions-box-item" key={suggestion.id} onClick={(e) => {getWeatherData(`${suggestion.name}, ${suggestion.country}`)}}>
                        <span className="block pl-3">{`${suggestion.name}, ${suggestion.country}`}</span>
                    </li>
                )
                )}
            </ul>
            }
        </div>
    )
}

export default SearchBar

