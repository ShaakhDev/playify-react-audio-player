import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './main.scss'
import PlayingContext from './Context'


function Main() {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef()

  return (

    <PlayingContext.Provider value={{ isPlaying, setIsPlaying, audioRef }}>
      <App />
    </PlayingContext.Provider>

  )
}

ReactDOM.render(
  <Main />
  ,
  document.getElementById('root')
);

