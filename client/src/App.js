import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import SingUp from './components/signup/SignUp';
import SignIn from './components/signin/SignIn';
import SignOut from './components/signout/SignOut';
import Chats from './components/chats/Chats';
import ChatRoom from './components/chatroom/ChatRoom';
import CheckUserAuthenticated from './components/CheckUserAuthenticated';

function App() {

  return (
    
    <Router>
      <CheckUserAuthenticated redirect='/chats'>
        <Switch>
            <Route path="/login" exact>
              <SignIn />
            </Route>
            <Route path="/logout" exact>
              <SignOut />
            </Route>
            <Route path="/register" exact>
              <SingUp />
            </Route>
            <Route path="/chats" exact>
              <Chats username='Test User' />
            </Route>
            <Route path="/" exact>
              <h1>Should be redirected to login if user's not authenticated yet</h1>
            </Route>
          </Switch>
        </CheckUserAuthenticated>
    </Router>
    
  );
}

export default App;
