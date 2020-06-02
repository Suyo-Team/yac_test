import React from 'react';
import {
    BrowserRouter as Router,
	Switch,
    Route,
    useRouteMatch
} from "react-router-dom";
import Chats from './chats/Chats';
import ChatRoom from './chatroom/ChatRoom';

import ReconnectingWebSocket from 'reconnecting-websocket';
import CheckUserAuthenticated, { getToken } from './CheckUserAuthenticated';

function Chat() {

    const match = useRouteMatch();

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
        <Router>
			<CheckUserAuthenticated redirect='/chats'>
		
                <Switch>

                    <Route path={`${match.path}`} exact>
                        <Chats socket={chatSocket} />
                    </Route>

                    <Route path={`${match.path}/:chatRoomId`} exact>
                        <ChatRoom socket={chatSocket} />
                    </Route>
                    
                </Switch>

            </CheckUserAuthenticated>
        </Router>
	);
}

export default Chat;
