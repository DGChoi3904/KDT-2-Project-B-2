import React, { useState } from 'react';
import './Main.css';

const LoginModal: React.FC = () => {
  const [inputIdValue, setInputIdValue] = useState('');
  const [inputPwValue, setInputPwValue] = useState('');

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputIdValue(e.target.value);
  };
  const handlePwChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputPwValue(e.target.value);
  };

  return (
    <div className="Modal">
      <input
        type="text"
        placeholder="ID"
        style={{ width: '80%' }}
        value={inputIdValue}
        onChange={handleIdChange}
      />
      <input
        type="password"
        placeholder="PW"
        style={{ width: '80%' }}
        value={inputPwValue}
        onChange={handlePwChange}
      />
      <div className='flexRowEvenly' style={{width: '50%'}}>
        <button className='fontSaria' style={{backgroundColor: 'transparent', border: 'none', fontWeight: '500'}}>SIGN IN</button>
        <button className='fontSaria' style={{backgroundColor: 'transparent', border: 'none', fontWeight: '500'}}>SIGN UP</button>
      </div>
    </div>
  );
};

export default LoginModal;
