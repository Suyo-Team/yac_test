import React from 'react';
import Grid from '@material-ui/core/Grid';
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
        padding: '5px',
        textAlign: 'right'
    },
    chatMessageContainer: {
        padding: '10px',
        minHeight: '50px'
    }
}));

export default function ChatMessage(props) {
    
    const classes = useStyles();

    const checkMessageUser = () => {
        return "flex-end"
    }

    return (
        <Grid container justify={checkMessageUser()} className={classes.chatMessageContainer}>
            <Grid item className={classes.chatMessage}>
                {props.message}
            </Grid>
        </Grid>
    );
}