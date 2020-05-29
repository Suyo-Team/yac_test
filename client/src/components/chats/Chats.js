import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import AddCircleRounded from '@material-ui/icons/AddCircleRounded';

import CheckUserAuthenticated, { getUser } from '../../components/CheckUserAuthenticated';

import ChatItem from './ChatItem';

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
    chatsListHeader: {
        borderBottom: "solid 2px grey",
        padding: '5px 10px',
        background: 'black',
        color: 'white',
        borderRadius: '4px 4px 0 0'
    },
    chatsList: {
        overflowY: 'auto',
        borderRadius: '0 0 4px 4px'
    }
}));

export default function Chats() {
    const classes = useStyles();

    const user = getUser();

    const [chatsState, setChatsState] = useState({
        chats: [
            {id: 1, chat_name: 'Chat de Prueba 1'},
            {id: 2, chat_name: 'Chat de Prueba 2'},
            {id: 3, chat_name: 'Chat de Prueba 3'},
            {id: 4, chat_name: 'Chat de Prueba 4'},
            {id: 5, chat_name: 'Chat de Prueba 5'},
            {id: 6, chat_name: 'Chat de Prueba 6'},
            {id: 7, chat_name: 'Chat de Prueba 7'},
            {id: 8, chat_name: 'Chat de Prueba 8'},
            {id: 9, chat_name: 'Chat de Prueba 9'},
        ]
    });

    const chatsList = chatsState.chats.map(chatItem => 
        <ChatItem id={chatItem.id} key={chatItem.id} chat_name={chatItem.chat_name}/>
    );

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Grid container
                    justify="space-between" 
                    alignItems="center"
                    className={classes.chatsListHeader}>
                    <Grid item>
                        <h3>{user.username}</h3>
                    </Grid>
                    <Grid item>
                        My chats
                    </Grid>
                    <Grid item>
                        <IconButton color="primary">
                            <AddCircleRounded />
                        </IconButton>
                    </Grid>
                </Grid>
                <Grid container className={classes.chatsList}>
                    {chatsList}
                </Grid>
            </div>
        </Container>
    );
}