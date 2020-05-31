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

import PropTypes from 'prop-types';
import ReconnectingWebSocket from 'reconnecting-websocket';


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

    // State to keep trak of the unread messages

    // Fetch the list of chats from the server
    useEffect(() => {
        let mounted = true;

        const fetchData = async () => {
            const result = await APIKit.get('/chats/');
            
            // Add an attribute 'unread' to every chat
            let chats_list = result.data.map(chat => {
                chat.unread = 0
                return chat
            });
            if (mounted) setChatsState({chats: chats_list});
        };
        fetchData();

        return () => {
            mounted = false;
        };
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
                history.push(`${match.url}/${data.id}`);  
            }
        } else if (data.event === 'new_message') {
            // Then we look up the chat where the message was sent
            // and increase in 1 the 'unread' counter
            let new_chats_state = chatsState.chats.map(chat => {
                if (chat.id === data.chat) {
                    chat.unread += 1
                }
                return chat
            });

            setChatsState({chats: new_chats_state});

        } else if (data.event === 'new_user_added') {
            // We should keep track of this, serialized data
            // can be changed overtime in the server            
            console.log(data)
                        
            // the received 'data' object will contain the chat
            // information where the user was added to, plus the users
            // that belong to that chat, but that list must
            // contain only the user's ids, which is not the case. Users list
            // come as a list of objects with user info.
            // Let's normalized that list
            const new_users_list = data.users.map(u => u.id)
            // Now, let's check if the user that was added to some chat
            // was the current user, so we can render the new chat in its screen
            if (new_users_list.includes(user.id)) {
                // Delete some attributes in the object
                // that should not be stored in the state
                delete data.type
                delete data.event
                data.users = new_users_list
                
                setChatsState({
                    chats: [
                        ...chatsState.chats,
                        data
                    ]
                })
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


Chats.propTypes = {
    socket: PropTypes.instanceOf(ReconnectingWebSocket).isRequired
}