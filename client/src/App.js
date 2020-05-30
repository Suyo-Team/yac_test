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

import ReconnectingWebSocket from 'reconnecting-websocket';

function App() {

  const chatSocket = new ReconnectingWebSocket('ws://localhost:8000/ws/chat/');

  chatSocket.onclose = function(e) {
      console.error('Chat socket closed unexpectedly');
  };
  chatSocket.onopen = function(e) {
      console.log('Connection opened');
  };

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
              <Chats socket={chatSocket} />
            </Route>
            <Route path="/chats/:chatRoomId" exact>
              <ChatRoom socket={chatSocket} />
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
