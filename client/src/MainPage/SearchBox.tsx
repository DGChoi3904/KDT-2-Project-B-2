import React from 'react';
import './Main.css';

const SearchBox: React.FC = () => {
  return(
    <div className='SearchBoxWrap'>
      <div className='FlexRowBetween'>
        <p>출발지</p>
        <input type="text" className='SearchBar' />
        <div className='WayPointHiddenButton'></div>
      </div>
      <div className='FlexRowBetween'>
        <p>경유지</p>
        <input type="text" className='SearchBar' />
        <button className='WayPointPlusButton'>+</button>
      </div>
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