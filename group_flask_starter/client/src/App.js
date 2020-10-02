import React, {useEffect, useState} from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Provider, connect, useDispatch } from 'react-redux';
import configureStore from "./store/configureStore";
import StockPage from "./components/StockPage";
import UserList from './components/UsersList';
import Login from './components/Login';
import SignUp from './components/SignUp';
import PortfolioPage from './components/PortfolioPage';
import LandingPage from './components/LandingPage';
import {setUser} from './store/authReducer'
import UserPage from './components/UserPage';

// const store = configureStore()

const protectedRoute = ({ component: Component, loggedIn, ...rest }) => {
  if (loggedIn) return <Route {...rest} component={Component} />;
  else return <Redirect to="/landing" />;
};
const mapStateToProps = (state) => {
  return { loggedIn: !!state.auth.id };
};

const ConnectedProtectedRoute = connect(mapStateToProps, null)(protectedRoute);

function App() {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    useEffect(() => {
      const loadUser = async () => {
        // enter your back end route to get the current user
        const res = await fetch("/api/users/current");
        if (res.ok) {
          res.data = await res.json(); // current user info - obj with key of user
          dispatch(setUser(res.data.userId, res.data.userEmail, res.data.userBalance, res.data.userLastName, res.data.userFirstName, res.data.userWatchlistId));
        }
        setLoading(false);
      }
      loadUser();
    }, [dispatch]);
    if(loading) return null;
  return (
    <BrowserRouter>
        {/* <Provider store={store}> */}
          <Switch>
          {/* <Route exact path="/stocks/:stockId" render={(props) => <StockPage {...props}></StockPage>}/> */}
            <ConnectedProtectedRoute
                  exact path="/"
                  component={PortfolioPage}
                ></ConnectedProtectedRoute>
            <ConnectedProtectedRoute
                  exact path="/stocks/:stockId"
                  render={(props) => <StockPage {...props}></StockPage>}
                  // component={StockPage}
            ></ConnectedProtectedRoute>

            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/landing" component={LandingPage}/>
            <ConnectedProtectedRoute exact path='/user/:userId' render={(props) => <UserPage {...props}></UserPage>}> </ConnectedProtectedRoute>
          </Switch>
        {/* </Provider> */}
    </BrowserRouter>
  );
}

export default App;
