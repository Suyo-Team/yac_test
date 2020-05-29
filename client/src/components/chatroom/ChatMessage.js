import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    chatMessage: {
        maxWidth: '70%',      
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