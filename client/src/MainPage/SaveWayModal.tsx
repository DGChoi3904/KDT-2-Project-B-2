import React from 'react';
import './Main.css';

interface SaveWayModalProps {
  onClose: () => void;
}

const SaveWayModal: React.FC<SaveWayModalProps> = ({ onClose }) => {
  return (
    <div className='Modal'>
      <p>경로 명을 입력하세요</p>
      <input type="text" placeholder='20자 이내로 입력해주세요' style={{width: '80%', height: '40px'}} />
      <div style={{width: '100px', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
        <button onClick={onClose}>저장</button>
        <button onClick={onClose}>취소</button>
      </div>
    </div>
  )
}

export default SaveWayModal;