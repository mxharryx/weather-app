import React from 'react';
import './App.css';
import Header from './components/Header';
import WeatherDisplay from './components/WeatherDisplay';

function App() {
  return (
    <div className="App">
      <Header />
      <WeatherDisplay />
    </div>
  );
}

export default App;