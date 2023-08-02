import React, {Component} from "react";
import getWeatherData from "../services/weatherService";
import {WiDaySunny, WiRain} from 'react-icons/wi';

class WeatherDisplay extends Component{
    constructor (props){
        super(props);
        this.state = {
            temperature: '',
            weatherCondition: '',
            location: '',
        };
    }

    async componentDidMount() {
        try {
            //Get user geolocation
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    async(position) => {
                        const {latitude, longitude} = position.coords;
                        const data = await getWeatherData(latitude, longitude);
                        if(data){
                            this.setState({
                                temperature: data.main.temp,
                                weatherCondition : data.weather[0].main,
                                location: data.name,
                            });
                        }
                    },
                    (error)=>console.error('Error getting location:',error)
                );
            } else {
                console.log("Geolocation is not supported by your browser");
            }
        } catch(error){
            console.error('Error fetching weather data:',error);
        }
    }
    
    render() {
    const { temperature, weatherCondition, location } = this.state;

    return(
        <div className="weather-display">
        <h2> {location} </h2>
        
        {weatherCondition === 'Clear' ? (
            <WiDaySunny className="weather-icon"/>
        ):(
            <WiRain className="weather-icon"/>
        )}
        
        <p> {temperature} °C </p>
        <p> {weatherCondition} </p>
        </div>
    );
    }
}

export default WeatherDisplay;

