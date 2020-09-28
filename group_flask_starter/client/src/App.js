import React from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import Login from './components/Login';


function App() {

  return (
    <BrowserRouter>
        <Switch>
            <Route path="/login" component={Login} />
        </Switch>
    </BrowserRouter>
  );
}

export default App;
