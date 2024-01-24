import React from 'react'
import "./style.css"
import { Link } from 'react-router-dom'


function Splash() {
  return (
    <div className="circle-menu-main">
    <div className="circle-menu-image">
      <img src="assets/splash/circle-logo.png" alt="Logo" />
    <div className="circle-menu">
      <div className="circle-menu-item"><Link to=""><span>Account</span></Link></div>
      <div className="circle-menu-item"><Link to=""><span>More from MadeX</span></Link></div>
      <div className="circle-menu-item"><Link to=""><span>Assistance/ Support</span></Link></div>
      <div className="circle-menu-item"><Link to=""><span>Subscription</span></Link></div>
      <div className="circle-menu-item"><Link to=""><span>MadeX Junior</span></Link></div>
      <div className="circle-menu-item"><Link to=""><span>Settings</span></Link></div>
      <div className="circle-menu-item"><Link to=""><span>Tour/Search</span></Link></div>
      <div className="circle-menu-item"><Link to="/login"><span>Login</span></Link></div>
      <div className="circle-menu-item"><Link to="/second-home"><span>Navigation</span></Link></div>
      <div className="circle-menu-item"><Link to=""><span>Mini Clips</span></Link></div>
    </div>
    </div>
  </div>
  )
}

export default Splash