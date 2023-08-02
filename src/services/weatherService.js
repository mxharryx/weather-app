const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

const getWeatherData = async(latitude, longitude) => {
    const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric';

    try{
        const response = await fetch(apiUrl);
        if(!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
        } catch (error){
            console.error('Error fetching weather data:',error);
            return null;
    }
};

export default getWeatherData;