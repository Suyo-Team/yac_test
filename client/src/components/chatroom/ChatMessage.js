import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';

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
        padding: '10px',
        textAlign: 'right'
    },
    chatMessageContainer: {
        padding: '10px',
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

export default function ChatMessage(props) {
    
    const classes = useStyles();

    const formatDate = dateString => {
        return moment(dateString).calendar();
    }

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