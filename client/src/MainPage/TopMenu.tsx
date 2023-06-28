import React from 'react';

const TopMenuStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0px 30px 0px 30px',
  backgroundColor: '#FFA41B',
  width: '430px',
  height: '80px',
}


function TopMenu() {
  return (
    <div style={TopMenuStyle}>
      <img src={process.env.PUBLIC_URL + '/resource/MyWay_Logo_S.png'} className="App-logo" alt="logo" />
      <div>Sign Up</div>
    </div>
  )
}

export default TopMenu;
