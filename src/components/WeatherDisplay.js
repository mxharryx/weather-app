import React, {Component} from "react";
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

