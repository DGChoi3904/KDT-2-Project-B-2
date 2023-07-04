import React, { useState } from 'react';
import Modal, { Styles } from 'react-modal';

import LoginModal from './LoginModal';

const TopMenuStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0px 30px 0px 30px',
  backgroundColor: '#FFA41B',
  width: '430px',
  height: '80px',
}

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
    padding: '0'
  },
};


function TopMenu() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div style={TopMenuStyle}>
      <img src={process.env.PUBLIC_URL + '/resource/MyWay_Logo_S.png'} alt="logo" />
      <div>
        <button onClick={openModal} className="ModalBtn">SIGN IN</button>
        <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={modalStyles}
        contentLabel="Login Modal"
        >
        <LoginModal />
      </Modal>
      </div>
    </div>
  )
}

export default TopMenu;
