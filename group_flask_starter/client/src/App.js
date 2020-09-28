import React from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import UserList from './components/UsersList';
import Logo from "./robinhood-logomark-white.png"
import SearchBar from './components/SearchBar'

function App() {

  return (
    <BrowserRouter>
        <div className="nav-bar">
        <nav>
            <ul className="nav-list">
                <li>
                  <NavLink to="/" activeclass="active"><img
                  className="home-logo"
                  src={Logo}
                  /></NavLink></li>
                <li className="search"><SearchBar></SearchBar></li>
                <li><NavLink to="/users" activeclass="active">Account</NavLink></li>
                <li><NavLink to="/" activeclass="active">Portfolio</NavLink></li>
            </ul>
        </nav>
        </div>
        <Switch>
            <Route path="/users">
                <UserList />
            </Route>

            <Route path="/">
            </Route>
        </Switch>
    </BrowserRouter>
  );
}

export default App;
