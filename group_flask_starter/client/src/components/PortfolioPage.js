import React from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import Logo from "../robinhood-logomark-white.png"
import SearchBar from './SearchBar'
import greenLogo from "../robinhood-logomark-green.png"

function PortfolioPage() {

  return (
    <BrowserRouter>
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
                <li className="search"><SearchBar></SearchBar></li>
                <li><NavLink to="/users" activeclass="active">Account</NavLink></li>
                <li><NavLink to="/" activeclass="active">Portfolio</NavLink></li>
            </ul>
        </nav>
        </div>
    </BrowserRouter>
  );
}

export default PortfolioPage;
