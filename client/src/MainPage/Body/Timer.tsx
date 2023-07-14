import React from 'react';
type TimerProps = {
  hour: number;
  minute: number;
  second: number;
};

function Timer({ hour, minute, second }: TimerProps) {
  return (
    <div className="timer" style={{ zIndex: '2', marginTop: '10px' }}>
      <img
        src={process.env.PUBLIC_URL + '/resource/timer.png'}
        className="timerImg"
        alt="timerImg"
      />{' '}
      {hour !== 0 ? hour + '시간' : ''}
      {minute}분 {second}초
    </div>
  );
}

export default Timer;
