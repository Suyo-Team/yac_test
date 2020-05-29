import React, { Component } from 'react';

class Chat extends React.Component {
	componentDidMount() {
		setTimeout(function(){ document.getElementById("cha").scrollTop = document.getElementById("cha").scrollHeight; }, 100);
	}


	render() {
		let messagesList = this.props.messages;
		let user = this.props.user;

		return (
				<div className="chat" id="cha">
					{messagesList.map(item => (
						<div className={(item.user == user) ? 'bubbleChatMyself' : 'bubbleChat'} key={item.date}>
							<div class="user">{item.user} - {item.date}</div>
							{item.message}.
						</div>
					))}
				</div>
		);
	}
}

export default Chat;