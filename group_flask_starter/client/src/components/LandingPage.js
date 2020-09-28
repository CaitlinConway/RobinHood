import React from 'react';
import { NavLink } from 'react-router-dom';
import BlackLogo from "../robinhood-logomark-black.png"
import greenLogo from "../robinhood-logomark-green.png"

function LandingPage(props) {
  return (
    <>
    <div className="landing-page-nav-bar">
        <nav>
            <ul className="landing-page-nav-list">
            <li className="landing-page-title">Batmanhood</li>
                <li className="home-logo-li">
                  <NavLink to="/" activeclass="active" className="landing-page-login-link">
                  <img
                  className="home-logo"
                  src={BlackLogo}
                  alt=""
                  />
                  <img
                  className="green-home-logo"
                  src={greenLogo}
                  alt=""
                  hidden
                  />
                  </NavLink></li>

                <li className='landing-page-nav-login-button'><NavLink to="/login" activeclass="active">Login</NavLink></li>
                <li className = 'landing-page-nav-sign-up-button'><NavLink to="/signup" activeclass="active">Sign Up
                </NavLink></li>
            </ul>
        </nav>
        </div>
        <div className ="landing-page">
        <div id={'landing-image'}>
          <div id={'invest'}>
          <h1 id={'invest-header'}>Investing for Everyone</h1>
          <span id={'invest-paragraph'}>Batmanhood, a pioneer of comission-free investing, gives you more ways to make your money work harder</span>
          <button className = 'landing-page-sign-up-button'>Sign Up</button>
          </div>
        </div>
        <div className='comission-fees'>
          <h1 id={'comission-fee-title'}>Break Free from Comission Fees</h1>
          <p id={'comission-fee-p'}>Make unlimited comission-free trades in stocks with Batmanhood Financial.</p>
        </div>
        </div>
        </>
  )
}
export default LandingPage;