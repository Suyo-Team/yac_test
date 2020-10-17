import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

const isLoggedIn = Boolean(
    // TODO: Conditional to know if it is logged in or not
    process.env.NODE_ENV === "development" || false
)

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
        <PrivateRoute path="/success" component={Success} />
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

function Home(){
    return <h1> Home </h1>
}

function Success() {
  return <h2> Success </h2>;
}
