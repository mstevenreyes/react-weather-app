const fetchWeatherData = async (cityCountry: string) => {
    const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${cityCountry}&days=3`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '09619a2d81msh96b54ec94a455fep1066dfjsn65238a18984e',
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options)
        .then(function(response){
            return response.text()
        })
        .then(function(data) {
            const result = JSON.parse(data)
            return result
        });
        return response
    } catch (error) {
        console.error(error);
    }
}

export default fetchWeatherData;
