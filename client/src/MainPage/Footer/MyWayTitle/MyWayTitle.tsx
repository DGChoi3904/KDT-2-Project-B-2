import React from 'react'
import '../MyWayCSS.css'

type MyWayTitleProps = {
  myWayUI: boolean;
  setMyWayUI: React.Dispatch<React.SetStateAction<boolean>>;
}

const MyWayTitle: React.FC<MyWayTitleProps> = ({ myWayUI, setMyWayUI }) => {

  const handleUIHidden = () => {
    setMyWayUI(false)
  }

  const handleUIShow = () => {
    setMyWayUI(true)
  }

  return (
    <div className="MyWayListTitle">
        <p>MyWay 목록</p>
        {myWayUI ? <button onClick={handleUIHidden}>UI 숨기기</button> : <button onClick={handleUIShow}>UI 보이기</button>}
    </div>
  )
}

export default MyWayTitle