import React, {useState} from 'react';
// import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackRounded from '@material-ui/icons/ArrowBackRounded';
import GroupAddRounded from '@material-ui/icons/GroupAddRounded';

import CustomLink from '../CustomLink';

const useStyles = makeStyles((theme) => ({
    paper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',      
      minHeight: '300px',
      height: '500px',
      borderRadius: '4px',
      boxShadow: '0 0 15px lightgray'
    },
    chatRoomHeader: {
        borderBottom: "solid 2px grey",
        padding: '5px 10px',
        background: 'black',
        color: 'white',
        borderRadius: '4px 4px 0 0'
    },
    chatMessages: {
        overflowY: 'auto',
        borderRadius: '0 0 4px 4px'
    }
}));

export default function ChatRoom(props) {
    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Grid container 
                      justify="space-between" 
                      alignItems="center"
                      className={classes.chatRoomHeader}>
                    <Grid item>
                        <CustomLink tag={IconButton} 
                                    to='/chats' 
                                    color="secondary">
                            <ArrowBackRounded />
                        </CustomLink>
                    </Grid>
                    <Grid item>
                        {props.chat_name}
                    </Grid>
                    <Grid item>
                        <IconButton color="primary">
                            <GroupAddRounded />
                        </IconButton>
                    </Grid>
                </Grid>
                <Grid container className={classes.chatMessages}>
                    <h1>Here go the chat messages</h1>
                </Grid>
            </div>
        </Container>
    );
}