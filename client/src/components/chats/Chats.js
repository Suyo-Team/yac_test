import React, {useState, useEffect} from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';

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


// Styles
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


// Main Component
export default function Chats(props) {

    // Classes to style the comonent
    const classes = useStyles();

    // Get the current user (logged-in user) fromt he cookies
    const user = getUser();
    // socket to handle messages sent and received to and from teh server
    const socket = props.socket;

    const match = useRouteMatch();
    const history = useHistory();
    
    // State to manage the user's chats list
    const [chatsState, setChatsState] = useState({
        chats: []
    });

    // Fetch the list of chats fromt eh server
    useEffect(() => {
        const fetchData = async () => {
            const result = await APIKit.get('/chats/');

            setChatsState({chats: result.data});
        };
        fetchData();
    }, []);

    // When receiving a message from the server via a socket
    // we need to execute some actions depending on the message 'event' property
    // i.e. if it's a 'new_message' event or a 'new_chat' event, etc.
    socket.onmessage = function(e) {
        const data = JSON.parse(e.data);
        // If event is 'new_chat'
        if (data.event === 'new_chat') {
            // Then we check if the current user is included in the new created chat
            if (data.users.includes(user.id)) {  
                // Now we redirect the user to that new chat room just created
                console.log(`${match.url}/${data.id}`)
                history.push(`${match.url}/${data.id}`);  
            }
        }
    };

    // Helper function to map the list of chats into a list of 
    // ChatItems components
    const chatsList = chatsState.chats.map(chatItem => 
        <ChatItem 
            id={chatItem.id}
            key={chatItem.id}
            chat_name={chatItem.chat_name}
            unread={chatItem.unread}
        />
    );
    
    // Dialog Create User State
    // State used to manage whether the dialog is opened or not
    const [open, setOpen] = useState(false);
    // When clicking the button to open the dialog
    const handleClickOpen = () => setOpen(true);
    // When dialog is closed
    const handleClose = () => setOpen(false);

    return (
        <Container component="main" maxWidth="xs">

            <div className={classes.paper}>

                <Grid container
                      justify="space-between" 
                      alignItems="center"
                      className={classes.chatsListHeader}>

                    <Grid item><h2>{user.username}</h2></Grid>

                    <Grid item><h3>My chats</h3></Grid>

                    <Grid item>

                        <IconButton color="primary" 
                                    onClick={handleClickOpen}>
                            <AddCircleRounded />
                        </IconButton>
                        
                    </Grid>

                </Grid>

                <List className={classes.chatsList}>{chatsList}</List>

            </div>

            <CreateChat open={open} 
                        onClose={handleClose} 
                        user={user} />

        </Container>
    );
}