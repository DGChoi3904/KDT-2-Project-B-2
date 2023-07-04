import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Main.css';

const LoginModal: React.FC = () => {
  const [inputIdValue, setInputIdValue] = useState('');
  const [inputPwValue, setInputPwValue] = useState('');
  // 커서가 버튼위에 Hover되었는지 확인하는 구문.
  const [isHoveredIN, setIsHoveredIN] = useState<boolean>(false);
  const [isHoveredUP, setIsHoveredUP] = useState<boolean>(false);

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputIdValue(e.target.value);
  };
  const handlePwChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputPwValue(e.target.value);
  };

  const handleMouseEnterIN = (): void => {
    setIsHoveredIN(true);
  };
  const handleMouseEnterUP = (): void => {
    setIsHoveredUP(true);
  };
  const handleMouseLeaveIN = (): void => {
    setIsHoveredIN(false);
  };
  const handleMouseLeaveUP = (): void => {
    setIsHoveredUP(false);
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
        <button onMouseEnter={handleMouseEnterIN} onMouseLeave={handleMouseLeaveIN}  className = {isHoveredIN ? 'signButtonEnter' : 'signButton'}>SIGN IN</button>
        <Link to={'/signup'} onMouseEnter={handleMouseEnterUP} onMouseLeave={handleMouseLeaveUP}  className = {isHoveredUP ? 'signButtonEnter' : 'signButton'} style={{textDecoration: 'none'}}>SIGN UP</Link>
      </div>
    </div>
  );
};

export default LoginModal;
