import React from 'react';
import { BrowserRouter, Switch, Route, NavLink, Redirect } from 'react-router-dom';
import { Provider, connect } from 'react-redux';
import configureStore from "./store/configureStore";
import StockPage from "./components/StockPage";
import UserList from './components/UsersList';
import Login from './components/Login';
import SignUp from './components/SignUp';
import PortfolioPage from './components/PortfolioPage';
import LandingPage from './components/LandingPage';


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
                  exact path="/"
                  component={PortfolioPage}
                ></ConnectedProtectedRoute>
            <Route exact path="/users">
                  <UserList />
            </Route>
            <ConnectedProtectedRoute
                  exact path="/stocks/:stockId"
                  render={() => <StockPage></StockPage>}
                  // component={StockPage}
            ></ConnectedProtectedRoute>
            <Route exact path="/stocks/:stockId" render={() => <StockPage></StockPage>}/>
            <Route exact path="/stocks/:stockId" render={() => <StockPage></StockPage>}/>
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
            <Route path="/landing" component={LandingPage}/>
          </Switch>
        </Provider>
    </BrowserRouter>
  );
}

export default App;
