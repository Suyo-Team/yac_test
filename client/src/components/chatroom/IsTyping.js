import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';
import PropTypes from 'prop-types';
import ReconnectingWebSocket from 'reconnecting-websocket';


const useStyles = makeStyles((theme) => ({
    typingContainer: {
      display: 'flex',
      height: '20px',
      width: '100%',
      alignItems: 'center',
      padding: '2px 10px',
      boxSizing: 'border-box',
      color: blue[600],
    }
}));


export default function IsTyping(props) {

    const classes = useStyles();

    const {chat, typingList } = props;

    const checkTypingOnChat = (chat_id) => {
        // Will check which of the users in the isTypingState are actually
        // typing on the current chat room
        return typingList.filter(item => {
            return item.chat.toString() === chat_id;
        });
    }

    // Helper function to render the label to be displayed
    // including the username of the users that are typing
    const renderIsTyping = () => {
        const typing_list = checkTypingOnChat(chat);

        if (typing_list.length > 0) {
            let label = '';
            typing_list.forEach((el, i, arr) => {            
                // If the item is not the first one, then we need to add commas
                if (i > 0) {
                    // If it's the last one we add 'and' instead of a comma
                    label += i === arr[arr.length - 1] ? 'and ' : ', '
                }
                // Add the username
                label += el.username
            });

            // If there are more than one user typing then whe add the plural 'are'
            // otherwise we add the singular 'is'
            label += typing_list.length > 1 ? 'are ' : 'is '
            label += ' typing ...'

            return label;
        }
    }

    return (
        <div className={classes.typingContainer}>
            <p>{ renderIsTyping() }</p>
        </div>
    )
}

IsTyping.propTypes = {
    chat: PropTypes.number.isRequired,
    typingList: PropTypes.arrayOf(Object).isRequired
}

