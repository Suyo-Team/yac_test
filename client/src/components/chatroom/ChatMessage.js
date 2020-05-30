import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    chatMessage: {
        width: '70%',
        borderRadius: '5px',
        backgroundColor: '#4765d0',
        color: 'white',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: '10px',
        textAlign: 'right'
    },
    chatMessageContainer: {
        padding: '10px',
        display: 'flex',
        justifyContent: 'flex-end'
    }
}));

export default function ChatMessage(props) {
    
    const classes = useStyles();

    return (
        <div key={props.key} className={classes.chatMessageContainer}>
            <div className={classes.chatMessage}>{props.message} by {props.user} at {props.created}</div>
        </div>
    );
}