import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import SingUp from './components/signup/SignUp';
import SignIn from './components/signin/SignIn';

function App() {
  return (
    <Router>
      <Switch>
          <Route path="/login">
            <SignIn />
          </Route>
          <Route path="/register">
            <SingUp />
          </Route>
          <Route path="/">
            <h1>Should be redirected to login if user's not authenticated yet</h1>
          </Route>
          <Route path="/chat">
            <h1>Here goes the Chat component</h1>
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
