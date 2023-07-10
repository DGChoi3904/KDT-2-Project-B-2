import React, { useState } from 'react';
import { getCookie } from '../../util/cookies';
import './ModalCSS.css';

interface SaveWayModalProps {
  onClose: () => void;
  addWayPointDB:
    | {
        [key: string]: string | string[] | number | number[] | undefined | null;
      }
    | undefined
    | null;
}

const SaveWayModal: React.FC<SaveWayModalProps> = ({
  addWayPointDB,
  onClose,
}) => {
  const [sendObj, setSendObj] = useState<SaveWayModalProps>();
  const [wayName, setWayName] = useState('');

  const wayNameAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWayName(e.target.value);
  };

  const objAddWayName = () => {
    if (!addWayPointDB) return;
    const tmpObj = { ...addWayPointDB };
    tmpObj.mongoWayName = `${wayName}`;
    console.log(tmpObj);
  };
  return (
    <div className="Modal">
      <p>경로 명을 입력하세요</p>
      {addWayPointDB?.mongoStart}
      <br />
      {addWayPointDB?.mongoWay}
      <br />
      {addWayPointDB?.mongoEnd}
      <input
        type="text"
        onChange={wayNameAdd}
        placeholder="20자 이내로 입력해주세요"
        style={{ width: '80%', height: '40px' }}
      />
      <div
        style={{
          width: '100px',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
        }}
      >
        <button onClick={objAddWayName}>저장</button>
        <button onClick={onClose}>취소</button>
      </div>
    </div>
  );
};

export default SaveWayModal;
