import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
// TODO: delete
import Chat from "./pages/Chat"

/*
 * Returns true if the user is logged in, false otherwise
 * Note: In a development environment it will always return true
 */
const isLoggedIn = Boolean(
    // TODO: Conditional to know if it is logged in or not
    process.env.NODE_ENV === "development" || false
)

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
  return <Chat>
        <h2>Success Chat</h2>
        </Chat>
}
