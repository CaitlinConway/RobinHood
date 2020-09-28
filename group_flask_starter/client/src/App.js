import React from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';


function App() {

  return (
    <BrowserRouter>
        <Switch>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
        </Switch>
    </BrowserRouter>
  );
}

export default App;
