import React, { useState } from 'react';
import Modal, { Styles } from 'react-modal';
import { setCookie, removeCookie } from '../util/cookies';
import LoginModal from './LoginModal';
import { useNavigate } from 'react-router-dom'; // 여기 추가

const TopMenuStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0px 30px 0px 30px',
  backgroundColor: '#FFA41B',
  width: '430px',
  height: '80px',
};

const modalStyles: Styles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 9999,
  },
  content: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '400px',
    height: '200px',
    border: '1px solid black',
    backgroundColor: 'beige',
    padding: '0',
  },
};
type TopMenuProps = {
  setLogin : React.Dispatch<React.SetStateAction<boolean>>;
}

const TopMenu:React.FC<TopMenuProps> = ({setLogin}) => {
  const [signUpStatus, setSignUpStatus] = useState(false);
  const [nickname, setNickname] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate(); // 여기 추가
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const logOut = () => {
    setSignUpStatus(false);
    removeCookie('nickname'); // removeCookie 함수를 사용하여 쿠키를 삭제합니다.
    navigate('/'); // 메인 페이지로 이동합니다.
  };
  const logIn = () => {
    setSignUpStatus(true);
  };
  return (
    <div style={TopMenuStyle}>
      <img
        src={process.env.PUBLIC_URL + '/resource/MyWay_Logo_S.png'}
        alt="logo"
      />
      <div>
        {signUpStatus ? (
          <div>
            <p>{nickname}</p>
            <button onClick={logOut}>logout</button>
          </div>
        ) : (
          <button onClick={openModal} className="ModalBtn">
            SIGN IN
          </button>
        )}
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          style={modalStyles}
          contentLabel="Login Modal"
        >
          <LoginModal
            setSignUpStatus={setSignUpStatus}
            setNickname={setNickname}
            closeModal={closeModal} // closeModal 함수 전달
            setLogin={setLogin}
          />
        </Modal>
      </div>
    </div>
  );
}

export default TopMenu;
