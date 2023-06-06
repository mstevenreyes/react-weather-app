const queryWeather = async (cityCountry: string) => {
    const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${cityCountry}&days=5`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '09619a2d81msh96b54ec94a455fep1066dfjsn65238a18984e',
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(JSON.parse(result));
    } catch (error) {
        console.error(error);
    }
}

export default queryWeather;
