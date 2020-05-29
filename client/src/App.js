import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import SingUp from './components/signup/SignUp';
import SignIn from './components/signin/SignIn';
import Chats from './components/chats/Chats';
import ChatRoom from './components/chatroom/ChatRoom';

function App() {

  return (
    <Router>
      <Switch>
          <Route path="/login" exact>
            <SignIn />
          </Route>
          <Route path="/register" exact>
            <SingUp />
          </Route>          
          <Route path="/chats" exact>
            <Chats username='Test User' />
          </Route>
          <Route path="/chatroom" exact>
            <ChatRoom chat_name='Test Chat Name' />
          </Route>
          <Route path="/" exact>
            <h1>Should be redirected to login if user's not authenticated yet</h1>
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
