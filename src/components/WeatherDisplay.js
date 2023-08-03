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
            loading: true,
            error: null,
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
                                loading: false,
                            });
                        } else{
                            this.setState({
                                loading: false,
                                error:'Unable to fetch the Weather Data',
                            });
                        }
                    },
                    (error)=>{
                        this.setState({
                            loading: false,
                            error:'Error getting location',
                        });
                        console.error('Error getting location:',error)
                    }
                );
            } else {
                this.setState({
                    loading:false,
                    error:'Geolocation is not supported by this browser.',
                });
                console.log("Geolocation is not supported by your browser");
            }
        } catch(error){
            this.setState({
                loading: false,
                error:'Error fetching weather data.',
            });
            console.error('Error fetching weather data:',error);
        }
    }
    
    render() {
    const { temperature, weatherCondition, location, loading, error } = this.state;

    if(loading){
        return <div>Loading...</div>
    }

    if(error){
        return <div> Error: {error} </div>
    }

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

