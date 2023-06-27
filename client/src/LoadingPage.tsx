import React from 'react';
import { Default } from 'react-spinners-css';
// import logo from './logo.svg';
import './App.css';

const spinnerStyle = {
  marginTop: '150px'
}

function Loading() {
  return (
    <div className="Width430">
      <div className="Loading-page">
        <img src={process.env.PUBLIC_URL + '/resource/MyWay_Logo_L.png'} className="App-logo" alt="logo" />
        <div style={spinnerStyle}>
          <Default color='white' />
        </div>
      </div>
    </div>
  );
}

export default Loading;
