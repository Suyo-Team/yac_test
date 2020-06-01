/**
 * Component to render the messages in the chat
 * 
 * It will render differently depending onn which user sent the message, 
 * either the current user, or one of the other users in the chatroom
 */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import PropTypes from 'prop-types';


// Styles
const useStyles = makeStyles((theme) => ({
    chatMessage: {
        width: 'auto',
        maxWidth: '70%',
        borderRadius: '5px',
        backgroundColor: '#133bca',
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
        padding: '2px 10px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'flex-end'
    },
    messageNotMe: {
        backgroundColor: '#d00a4a',
        textAlign: 'left'
    },
    messageContainerNotMe: {
        alignItems: 'flex-start'
    },
    auxMessage: {
        fontSize: '10px',
        color: 'grey'    
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

    const renderAuxMessage = () => {
        const userName = props.activeUser.username === props.user.username ? 'Me' : props.user.username
        return (
            <span>
                <span style={{fontWeight: 'bolder'}}>{userName}</span> {formatDate(props.created)}
            </span>
        )
    }
    return (
        <div key={props.key} className={messageContainerClasses}>            
            <div className={messageClasses}>  
                <span>{props.message}</span>
            </div>
            <div className={classes.auxMessage}>
                {renderAuxMessage()}
            </div>

        </div>
    );
}


ChatMessage.propTypes = {
    message: PropTypes.string.isRequired,
    key: PropTypes.number.isRequired,
    user: PropTypes.object.isRequired,
    activeUser: PropTypes.object.isRequired,
    created: PropTypes.string.isRequired
}