import React from 'react';
<<<<<<< HEAD
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from "./store/configureStore";
import StockPage from "./components/StockPage";
import UserList from './components/UsersList';
import Logo from "./robinhood-logomark-white.png";
import SearchBar from './components/SearchBar';
import greenLogo from "./robinhood-logomark-green.png";
import Login from './components/Login';
import SignUp from './components/SignUp';
const store = configureStore();
if (ProcessingInstruction.env.NODE_ENV !== 'production') {
  window.store = store;
}
=======
import { BrowserRouter, Switch, Route, NavLink, Redirect } from 'react-router-dom';
import StockPage from "./components/StockPage"
import UserList from './components/UsersList';
import Login from './components/Login';
import LandingPage from "./components/LandingPage"
import Signup from './components/SignUp'
import PortfolioPage from './components/PortfolioPage';
import {connect, Provider} from 'react-redux'
import configureStore from "./store/configureStore";
>>>>>>> master

const store = configureStore()

const protectedRoute = ({ component: Component, loggedIn, ...rest }) => {
  if (loggedIn) return <Route {...rest} component={Component} />;
  else return <Redirect to="/landing" />;
};
const mapStateToProps = (state) => {
  return { loggedIn: !!state.auth.id };
};

const ConnectedProtectedRoute = connect(mapStateToProps, null)(protectedRoute);

function App() {

  return (
    <BrowserRouter>
<<<<<<< HEAD
      <Provider>
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
=======
        <Provider store={store}>
>>>>>>> master
        <Switch>
        <ConnectedProtectedRoute
              exact
              path="/"
              component={PortfolioPage}
            ></ConnectedProtectedRoute>
            <Route exact path="/users">
                <UserList />
            </Route>
<<<<<<< HEAD
            <Route path="/stocks/:stockId" component={StockPage}/>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
            <Route path="/" />
        </Switch>
      </Provider>
=======
            <Route exact path="/stocks/:stockId" component={StockPage}/>
            <Route exact path="/login" component={Login} />
            {/* <Route exact path="/signup" component={SignUp} /> */}
            <Route path="/landing" component={LandingPage}>
              </Route>
        </Switch>
        </Provider>
>>>>>>> master
    </BrowserRouter>
  );
}

export default App;
