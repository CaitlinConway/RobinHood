import React from 'react';
import { BrowserRouter, Switch, Route, NavLink, Redirect } from 'react-router-dom';
import UserList from './components/UsersList';
import Logo from "./robinhood-logomark-white.png"
import SearchBar from './components/SearchBar'
import greenLogo from "./robinhood-logomark-green.png"
import Login from './components/Login';
import LandingPage from "./components/LandingPage"
import PortfolioPage from './components/PortfolioPage';
import {connect, Provider} from 'react-redux'
import configureStore from "./store/configureStore";

const store = configureStore();

const protectedRoute = ({ component: Component, loggedIn, ...rest }) => {
  if (loggedIn) return <Route {...rest} component={Component} />;
  else return <Redirect to="/" />;
};
const mapStateToProps = (state) => {
  return { loggedIn: !!state.auth.id };
};

const ConnectedProtectedRoute = connect(mapStateToProps, null)(protectedRoute);

function App() {

  return (
    <BrowserRouter>
            <Provider store={store}>
        <Switch>
        <ConnectedProtectedRoute
              exact
              path="/"
              component={PortfolioPage}
            ></ConnectedProtectedRoute>
            <Route path="/users">
                <UserList />
            </Route>
            <Route path="/login" component={Login} />
            <Route path="/" component={LandingPage}>
            </Route>
        </Switch>
        </Provider>
    </BrowserRouter>
  );
}

export default App;
