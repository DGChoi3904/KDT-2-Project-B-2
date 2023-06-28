import React, { useState } from 'react';
import './Main.css';

const SearchBox: React.FC = () => {
  const [wayPointCount, setWayPointCount] = useState(1);

  const handleClick = () => {
    setWayPointCount(prevCount => prevCount + 1);
  };

  return(
    <div className='SearchBoxWrap'>
      <div className='FlexRowBetween'>
        <p>출발지</p>
        <input type="text" className='SearchBar' />
        <div className='WayPointHiddenButton'></div>
      </div>
      {/* 경유지 설정 -> 초기 1개, + 버튼을 누를 때 마다 1개씩 추가 됨 */}
      {Array.from({ length: wayPointCount }).map((_, index) => (
        <div className='FlexRowBetween' key={index}>
        <p>경유지</p>
          <input type="text" className='SearchBar' />
          {index === wayPointCount - 1 ? (
            <button className='WayPointPlusButton' onClick={handleClick}>+</button>
          ) : <div className='WayPointHiddenButton'></div>}
        </div>
      ))}
      <div className='FlexRowBetween'>
        <p>목적지</p>
        <input type="text" className='SearchBar' />
        <div className='WayPointHiddenButton'></div>
      </div>
      <button>확인</button>
    </div>
  )
}

export default SearchBox;