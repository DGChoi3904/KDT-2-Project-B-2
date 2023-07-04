import React, { FormEventHandler, useState } from 'react';
import { Link } from 'react-router-dom';
import './Main.css';
import { setCookie } from '../util/cookies';

const LoginModal: React.FC = () => {
  const [inputIdValue, setInputIdValue] = useState('');
  const [inputPwValue, setInputPwValue] = useState('');
  // 커서가 버튼위에 Hover되었는지 확인하는 구문.
  const [isHoveredIN, setIsHoveredIN] = useState<boolean>(false);
  const [isHoveredUP, setIsHoveredUP] = useState<boolean>(false);

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //ID
    setInputIdValue(e.target.value);
  };
  const handlePwChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //password
    setInputPwValue(e.target.value);
  };

  //* mouse이벤트 부분
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
  // *로그인 로직
  const logInLogic = async () => {
    try {
      const response = await fetch(`/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: inputIdValue,
          password: inputPwValue,
        }),
      });
      const result = await response.json(); // 서버로부터 JSON 결과 받음
      if (result.success) {
        console.log('로그인 성공');
        console.log(result);
        setCookie('nickname', result.nickname); // 로그인 성공 시, 쿠키에 user 정보 저장
      } else {
        console.log('로그인 실패');
      }
    } catch (error) {
      console.log('try 에러 발생', error);
    }
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

      <div className="flexRowEvenly" style={{ width: '50%' }}>
        <button
          onMouseEnter={handleMouseEnterIN}
          onMouseLeave={handleMouseLeaveIN}
          onClick={logInLogic}
          className={isHoveredIN ? 'signButtonEnter' : 'signButton'}
        >
          SIGN IN
        </button>

        <Link
          to={'/signup'}
          onMouseEnter={handleMouseEnterUP}
          onMouseLeave={handleMouseLeaveUP}
          className={isHoveredUP ? 'signButtonEnter' : 'signButton'}
          style={{ textDecoration: 'none' }}
        >
          SIGN UP
        </Link>
      </div>
    </div>
  );
};

export default LoginModal;
