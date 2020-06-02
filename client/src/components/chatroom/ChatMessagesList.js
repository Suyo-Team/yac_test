/**
 * Will render the list of messages passed thorou the parameters
 */

import React from 'react';
import PropTypes from 'prop-types';
import ChatMessage from './ChatMessage';
import DisplayResultOrError from '../DisplayResultOrError';


export default function ChatMessagesList(props) {
    
    const { messagesList, user, isLoading, somethingWentWrong } = props;

    // Helper function to map the messages list and generate 
    // a list of ChatMessage components
    const renderChatMessages = () => {
        if (messagesList.length > 0) {
            return messagesList.map(message =>
                <ChatMessage message={message.text}
                             key={message.id} 
                             user={message.user}
                             activeUser={user}
                             created={message.created} />
            );
        } else {
            return (
                <DisplayResultOrError isLoading={isLoading}
                                      somethingWentWrong={somethingWentWrong} />
            );
        } 
    }

    return renderChatMessages()
}

ChatMessagesList.propTypes = {
    messagesList: PropTypes.arrayOf(Object).isRequired,
    user: PropTypes.object.isRequired,
    isLoading: PropTypes.bool,
    somethingWentWrong: PropTypes.arrayOf(Object)
}
