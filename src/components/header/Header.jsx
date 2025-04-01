import React from 'react'
import './Header.css'
import profileImage from '../../assets/MyImage.jpg'
import Play from "../../assets/play.png"
import Pause from "../../assets/pause.png"
import Stop from "../../assets/stop.png"

const Header = () => {
  return (
    <div className='header shadow rounded  '>
      <div className='title'>Ticketing System</div>
      <div className='profile'>
        <div className='start'><img src={Play} alt="" /></div>
        <div className='stop'><img src={Stop} alt="" /></div>
        <div className='proSec'>
        <img src={profileImage} alt="" />
        <div>Nawoda</div>
        </div>
      </div>
      
    </div>
  )
}

export default Header