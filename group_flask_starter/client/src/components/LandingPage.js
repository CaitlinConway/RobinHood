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
                  </NavLink></li>
                <li><NavLink to="/login" activeclass="active">Login</NavLink></li>
                <li><NavLink to="/signup" activeclass="active">Sign Up
                </NavLink></li>
            </ul>
        </nav>
        </div>
        </>
  )
}
export default LandingPage;
