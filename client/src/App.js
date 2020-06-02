import React from 'react';
import {
	Switch,
	Route
} from "react-router-dom";
import SingUp from './components/signup/SignUp';
import SignIn from './components/signin/SignIn';
import SignOut from './components/signout/SignOut';
import Chats from './components/chats/Chats';
import ChatRoom from './components/chatroom/ChatRoom';

import ReconnectingWebSocket from 'reconnecting-websocket';
import CheckUserAuthenticated, { getToken } from './components/CheckUserAuthenticated';

function App() {

	const token = getToken()
	const defWebSocketUrl = (tk) => {
		let auth_token = tk ? `?token=${tk}` : ''
		return `ws://${window.location.host}/ws/chat/${auth_token}`
	}

	// Web socket to handle connections and messages throuh channels to the server
	const chatSocket = new ReconnectingWebSocket(defWebSocketUrl(token));

	// Some informative functions for debuging
	chatSocket.onclose = function (e) {
		console.error('Chat socket closed unexpectedly');
	};
	chatSocket.onopen = function (e) {
		console.log('Connection opened');
	};

	return (
		
		<Switch>

			<Route path="/login" exact><SignIn /></Route>

			<Route path="/logout" exact><SignOut /></Route>

			<Route path="/register" exact><SingUp /></Route>

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
	);
}

export default App;
