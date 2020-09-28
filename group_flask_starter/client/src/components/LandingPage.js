import React from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import Logo from "../robinhood-logomark-white.png"
import greenLogo from "../robinhood-logomark-green.png"

function LandingPage(props) {
  return (
    <>
    <div className="nav-bar">
        <nav>
            <ul className="nav-list">
                <li className="home-logo-li">
                  <NavLink to="/" activeclass="active">
                  <img
                  className="home-logo"
                  src={Logo}
                  alt=""
                  />
                  <img
                  className="green-home-logo"
                  src={greenLogo}
                  alt=""
                  hidden
                  />
                  Batmanhood
                  </NavLink></li>
                <li><NavLink to="/login" activeclass="active">Login</NavLink></li>
                <li className = 'landing-page-sign-up-button'><NavLink to="/signup" activeclass="active">Sign Up
                </NavLink></li>
            </ul>
        </nav>
        </div>
        <div className='landing-image'>
          <h1>Investing for Everyone</h1>
          <p>Batmanhood, a pioneer of comission-free investing, gives you more ways to make your money work harder</p>
          <button className = 'landing-page-sign-up-button'>Sign Up</button>
        </div>
        <div className='comission-fees'>
          <h1>Break Free from Comission Fees</h1>
          <p>Make unlimited comission-free trades in stocks with Batmanhood Financial.</p>
        </div>
        </>
  )
}
export default LandingPage;
