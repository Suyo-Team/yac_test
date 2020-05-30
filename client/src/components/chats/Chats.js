import React, {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import AddCircleRounded from '@material-ui/icons/AddCircleRounded';

import APIKit from '../APIKit';

import ChatItem from './ChatItem';
import { getUser } from '../CheckUserAuthenticated';
import CreateChat from '../dialogs/CreateChat';

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
        width: '100%',
        overflowY: 'auto',
        borderRadius: '0 0 4px 4px'
    }
}));

export default function Chats(props) {
    const classes = useStyles();

    const user = getUser();
    const socket = props.socket;

    const [chatsState, setChatsState] = useState({
        chats: []
    });

    useEffect(() => {
        const fetchData = async () => {
            const result = await APIKit.get('/chats/');

            setChatsState({chats: result.data});
        };
        fetchData();
    }, []);

    socket.onmessage = function(e) {
        const data = JSON.parse(e.data);
        console.log(data);
    };

    const chatsList = chatsState.chats.map(chatItem => 
        <ChatItem id={chatItem.id} key={chatItem.id} chat_name={chatItem.chat_name}/>
    );


    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState('');
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = (value) => {
      setOpen(false);
      setSelectedValue(value);
    };

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
                        <IconButton color="primary" onClick={handleClickOpen}>
                            <AddCircleRounded />
                        </IconButton>
                    </Grid>
                </Grid>
                <List className={classes.chatsList}>
                    {chatsList}
                </List>
            </div>

            <CreateChat selectedValue={selectedValue} open={open} onClose={handleClose} />
        </Container>
    );
}