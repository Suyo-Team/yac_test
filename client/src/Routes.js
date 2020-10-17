import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Chat from "./pages/Chat";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";

import { isLoggedIn as loggedIn } from "./utils";
import store from "./redux/store";

/*
 * Returns true if the user is logged in, false otherwise
 * Note: In a development environment it will always return true
 */
const isLoggedIn = Boolean(
  // TODO: Conditional to know if it is logged in or not
  process.env.NODE_ENV === "development" ||
    loggedIn(store.getState().login.authToken)
);

/*
 * It creates a valid Route if the user is logged, it will redirect the user to
 * "/login" otherwise
 */
function PrivateRoute({ component: Component, ...rest }) {
  // Taken from https://medium.com/@tomlarge/private-routes-with-react-router-dom-28e9f40c7146
  return (
    <Route
      {...rest}
      render={(props) => {
        return isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" from={props.location} />
        );
      }}
    />
  );
}

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <PrivateRoute path="/" component={Chat} />
      </Switch>
    </Router>
  );
}
