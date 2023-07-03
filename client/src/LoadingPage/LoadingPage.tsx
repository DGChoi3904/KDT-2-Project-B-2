import React, { useEffect } from 'react';
// react-spinners-css 라는 npm module, 설치 필요 / client 디렉토리에서 -> npm install react-spinners-css
import { Default } from 'react-spinners-css';
import { useNavigate  } from 'react-router-dom';
// import logo from './logo.svg';
import './Loading.css';

const spinnerStyle = {
  marginTop: '150px'
}

function Loading() {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate('/main');
    }, 2000);

    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <div className="Width430">
      <div className="Loading-page">
        <img src={process.env.PUBLIC_URL + '/resource/MyWay_Logo_L.png'} className="App-logo" alt="logo" />
        <div style={spinnerStyle}>
          <Default color='black' />
        </div>
      </div>
    </div>
  );
}

export default Loading;
