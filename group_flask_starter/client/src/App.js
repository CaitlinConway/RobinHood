import React from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import StockPage from "./components/StockPage"
import UserList from './components/UsersList';
import Logo from "./robinhood-logomark-white.png"
import SearchBar from './components/SearchBar'
import greenLogo from "./robinhood-logomark-green.png"
import Login from './components/Login';
import SignUp from './components/SignUp';



function App() {

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
        <Switch>
            <Route path="/users">
                <UserList />
            </Route>
            <Route path="/stocks/:stockId" component={StockPage}/>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
            <Route path="/">
            </Route>
        </Switch>
    </BrowserRouter>
  );
}

export default App;
