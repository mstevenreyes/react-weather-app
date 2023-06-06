import { useState } from "react"
import queryWeather from "./Api"

export default function Main() {
    const [input, setInput] = useState("")
    const getClassName = () => {
        return ""
    }

    return (
        <>
            <main className="w-full">
                <div className="flex flex-col items-center">
                    <div className="search-bar flex items-center h-10 w-9/12 rounded-xl  active:outline-none outline-none text-white text-xl text-green-950 mb-5 duration-300">
                        <img className="w-8" src="./src/assets/search-icon.svg" alt="" />
                        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
                    </div>
                    
                    <div className="card opacity-90 w-9/12 h-48 bg-neutral-200/20 rounded-md">
                        <p>28</p>
                    </div>
                    <button className="w-max mt-5" onClick={() => queryWeather(input)}>Search</button>
                    <div className="forecast-container flex">
                        <div className="forecast-card">Mon</div>
                        <div className="forecast-card">Tue</div>
                        <div className="forecast-card">Wed</div>
                    </div>
                </div>
            </main>
        </>
    )

  
}