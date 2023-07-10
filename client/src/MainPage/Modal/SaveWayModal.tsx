import React, { useState, useEffect } from 'react';
import { getCookie } from '../../util/cookies';
import './ModalCSS.css';
import { createWayPoint } from '../../util/saveWayObj';

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
  const [sendObj, setSendObj] = useState<{
    [key: string]: string | string[] | number | number[] | undefined | null;
  }>();
  const [wayName, setWayName] = useState('');
  const cookieUserId = getCookie('userId');

  const wayNameAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWayName(e.target.value);
  };

  const objAddWayName = async () => {
    if (!addWayPointDB) return;
    if (!cookieUserId) return console.log('로그인 후 사용해 주십시오');
    const tmpObj: {
      [key: string]: string | string[] | number | number[] | undefined | null;
    } = {
      start: addWayPointDB.mongoStart,
      wayPoints: addWayPointDB.mongoWay,
      end: addWayPointDB.mongoEnd,
      wayName: wayName,
      userId: cookieUserId,
    };
    tmpObj.mongoWayName = `${wayName}`;
    tmpObj.mongoUserId = `${cookieUserId}`;
    console.log(tmpObj);
    setSendObj(tmpObj);
    const result = await createWayPoint(tmpObj);
    console.log(result);
  };
  useEffect(() => {
    if (sendObj) {
      console.log(sendObj);
    }
  }, [sendObj]);
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
        required={true}
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
