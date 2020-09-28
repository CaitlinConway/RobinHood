import React from 'react';
import { BrowserRouter, Switch, Route, NavLink, Redirect } from 'react-router-dom';
import StockPage from "./components/StockPage"
import UserList from './components/UsersList';
import Login from './components/Login';
import LandingPage from "./components/LandingPage"
import Signup from './components/SignUp'
import PortfolioPage from './components/PortfolioPage';
import {connect, Provider} from 'react-redux'
import configureStore from "./store/configureStore";

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
        <Provider store={store}>
        <Switch>
        <ConnectedProtectedRoute
              exact
              path="/"
              component={PortfolioPage}
            ></ConnectedProtectedRoute>
            <Route exact path="/users">
                <UserList />
            </Route>
            <Route exact path="/stocks/:stockId" component={StockPage}/>
            <Route exact path="/login" component={Login} />
            {/* <Route exact path="/signup" component={SignUp} /> */}
            <Route path="/landing" component={LandingPage}>
              </Route>
        </Switch>
        </Provider>
    </BrowserRouter>
  );
}

export default App;
