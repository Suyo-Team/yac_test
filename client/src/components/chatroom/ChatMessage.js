/**
 * Component to render the messages in the chat
 * 
 * It will render differently depending onn which user sent the message, 
 * either the current user, or one of the other users in the chatroom
 */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';


// Styles
const useStyles = makeStyles((theme) => ({
    chatMessage: {
        width: '70%',
        borderRadius: '5px',
        backgroundColor: '#4765d0',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'nowrap',
        justifyContent: 'flex-end',
        alignItems: 'space-between',
        padding: '5px',
        textAlign: 'right'
    },
    chatMessageContainer: {
        padding: '2px',
        display: 'flex',
        justifyContent: 'flex-end'
    },
    messageNotMe: {
        backgroundColor: '#d04760',
        textAlign: 'left'
    },
    messageContainerNotMe: {
        justifyContent: 'flex-start'
    },
    auxMessage: {
        fontSize: '11px'      
    }
}));


// Main Component
export default function ChatMessage(props) {
    
    // Classes to style the component
    const classes = useStyles();

    // Function to format the date of creation of the message
    // We're using Moment js to give it a freadly and intuitive format
    const formatDate = dateString => {
        return moment(dateString).calendar();
    }

    // Defines the classes for the message depending on the user that sent it
    const getMessageClasses = () => {
        let messageClassesList = classes.chatMessage
        let messageContainerClassesList = classes.chatMessageContainer

        if (props.activeUser.id !== props.user.id) {
            messageClassesList += ' ' + classes.messageNotMe
            messageContainerClassesList += ' ' + classes.messageContainerNotMe
        }

        return {
            messageClasses: messageClassesList,
            messageContainerClasses: messageContainerClassesList
        }
    }
    let {messageClasses, messageContainerClasses} = getMessageClasses();

    return (
        <div key={props.key} className={messageContainerClasses}>

            <div className={messageClasses}>  

                <span>{props.message}</span>

                <span className={classes.auxMessage}>
                    by <span style={{fontWeight: 'bolder'}}>{props.user.username}</span> {formatDate(props.created)}
                </span>

            </div>

        </div>
    );
}