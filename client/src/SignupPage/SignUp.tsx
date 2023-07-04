import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

function SignUp() {

  const [id, setId] = useState<string>('');
  const [pwd, setPwd] = useState<string>('');
  const [pwdCheck, setPwdCheck] = useState<string>('');
  const [name, setName] = useState<string>('');
  // 커서가 버튼위에 Hover되었는지 확인하는 구문.
  const [isHovered, setIsHovered] = useState<boolean>(false);
  // SIGN UP 버튼 눌림 확인
  // const [buttonOn, setButtonOn] = useState<boolean>(false);

  // SIGN UP 버튼 눌릴 경우 /main으로 이동
  // const navigate = useNavigate();
  // useEffect(() => {
  //   if(buttonOn) {
  //     navigate('/main');
  //   }
  // }, [navigate]);

  const handleIdChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setId(event.target.value);
  };
  const handlePwdChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setPwd(event.target.value);
  };
  const handlePwdCheckChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setPwdCheck(event.target.value);
  };
  const handleNameChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setName(event.target.value);
  };

  const handleMouseEnter = (): void => {
    setIsHovered(true);
  };

  const handleMouseLeave = (): void => {
    setIsHovered(false);
  };

  // SING UP 누를 경우 /main으로 이동
  const navigate = useNavigate();
  const handleOnPress = (): void => {
    navigate('/main');
  }

  return (
    <div id="signup" className="signup">
      <form method="POST" className="flex-column-center">
        <h2 className="title-style">회원가입</h2>
        <label htmlFor="id" className="signup-label-size flex-row-center">
          <div className="flex-row-center signup-input-name">ID</div>
          <div className="flex-column-center signup-input-box">
            <input
              name="id"
              type="text"
              onChange={handleIdChange}
              value={id}
              className="signup-input"
              placeholder="6자리 이상 입력해주세요."
            />
          </div>
        </label>
        <label htmlFor="pwd" className="signup-label-size flex-row-center">
          <div className="flex-row-center signup-input-name">PW</div>
          <div className="flex-column-center signup-input-box">
            <input
              name="pwd"
              type="password"
              onChange={handlePwdChange}
              value={pwd}
              className="signup-input"
              placeholder="8자리 이상 입력해주세요."
            />
          </div>
        </label>
        <label htmlFor="pwdCheck" className="signup-label-size flex-row-center">
          <div className="flex-row-center signup-input-name">
            PW
            <br />
            Check
          </div>
          <div className="flex-column-center signup-input-box">
            <input
              name="pwdCheck"
              type="password"
              onChange={handlePwdCheckChange}
              value={pwdCheck}
              className="signup-input"
              placeholder="비밀번호를 다시 입력하세요."
            />
          </div>
        </label>
        <label htmlFor="name" className="signup-label-size flex-row-center">
          <div className="flex-row-center signup-input-name">Name</div>
          <div className="flex-column-center signup-input-box">
            <input
              name="name"
              type="text"
              onChange={handleNameChange}
              value={name}
              className="signup-input"
              placeholder="20자 이하로 입력해주세요."
            />
          </div>
        </label>
        <div className="flex-column-center signup-button-box">
          <button
            type="submit"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleOnPress}
            className="signup-button"
            style={{ color: isHovered ? '#fff' : 'inherit' }}
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}
export default SignUp;
