import React, { 
    useState, 
    useRef, 
    useLayoutEffect, 
    useEffect 
} from 'react';
import { useParams } from "react-router-dom";

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackRounded from '@material-ui/icons/ArrowBackRounded';
import GroupAddRounded from '@material-ui/icons/GroupAddRounded';
import Send from '@material-ui/icons/Send';
import TextField from '@material-ui/core/TextField';
import useStayScrolled from 'react-stay-scrolled';

import APIKit from '../APIKit';
import CustomLink from '../CustomLink';
import ChatMessage from './ChatMessage';
import { getUser } from '../CheckUserAuthenticated';


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
    chatRoomHeader: {
        borderBottom: "solid 2px grey",
        padding: '5px 10px',
        background: 'black',
        color: 'white',
        borderRadius: '4px 4px 0 0'
    },
    chatMessages: {
        overflowY: 'auto',
        height: '100%',
        width: '100%',
        padding: '5px 10px',
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'nowrap'
    },
    chatSubmit: {
        borderRadius: '0 0 4px 4px',
        padding: '5px 10px',
        borderTop: "solid 2px grey",
    },
    message: {
        width: '85%'
    },
    submitMessageButton: {
        width: '15%'
    },
    addUserButtonContainer: {
        minWidth: '35px'
    }
}));


// Main Component
export default function ChatRoom(props) {

    // Classes to style the component
    const classes = useStyles();

    // Parameter taken from the url route, this will determine 
    // which chat data we need to retrieve from server
    let { chatRoomId } = useParams();
    
    // Get current user from cookies
    const user = getUser();

    // Socket to manage messages from channels
    const socket = props.socket;

    // References to some document elements
    const inputMessage = useRef(null);
    const chatMessagesRef = useRef();

    // Hook to help us keep the chat messages list scrolled to bottom all the time
    const { stayScrolled } = useStayScrolled(chatMessagesRef);
    
    // This state will manage the message that user is intending to send
    const [messageState, setMessageState] = useState({
        message: ''
    });

    // State to manage the messages list in the chat
    const [chatMessagesState, setChatMessagesState] = useState({
        messages: []
    });

    // State to store the chat information once retrieved from server
    const [chatState, setChatState] = useState({
        id: null,
        chat_name: '',
        private: true,
        users: [],
    });

    // Fecthignt he chat information via API
    useEffect(() => {
        const fetchData = async () => {
            const result = await APIKit.get(`/chats/${chatRoomId}`);            

            setChatMessagesState({messages: result.data.chat_messages});
            setChatState({
                id: result.data.id,
                chat_name: result.data.chat_name,
                private: result.data.private,
                users: result.data.users
            });
        };
        fetchData();
    }, []);

    // Stay chat messages list component scrolled to bottom 
    // according to the messages list length
    useLayoutEffect(() => {
            stayScrolled();
        }, [chatMessagesState.messages.length]
    );
    
    // Function to handle changes in the input where the message 
    // is being typed
    const onChangeMessageHandler = (e) => {
        setMessageState({
            message: e.target.value
        });
    }

    // When pressing enter, the messages is submited
    const onKeyPressHandler = (e) => {
        if (e.key === 'Enter') {
            submitMessageHandler();
        }
    }

    // Function to submit the message
    // Validates if the input is empty
    const submitMessageHandler = async (e) => {

        if (messageState.message.length === 0) {
            window.alert('Messages cannot be empty strings');
        } else {
            const payload = {
                chat: chatRoomId,
                text: messageState.message
            }
            
            await APIKit.post('/messages/', payload);            
    
            setMessageState({message: ''});
            inputMessage.current.focus();
        }
    }

    // Everytime we receive a message from teh server with the messages 
    // information, we update the messages list state.
    // The flow is like folows.
    // All the messages are sent to the server via http through an API
    // Django stores the message in the db and, using a signal to catch that action,
    // it sends a message using a channel_layer to all the members in the group 
    // (All the people connected to the socket).
    // This message will contain the message serialized directly from django, with
    // the same structure we use to submit it.
    socket.onmessage = function(e) {
        // Parse the data to JSON
        const data = JSON.parse(e.data);

        // If event is 'new_message'
        if (data.event === 'new_message') {
            // then we check that the chat id of the message that is being received
            // matches the current chat room. If so, we added to the messages state, and
            // therefore, it's being rendered to the screen
            if (data.chat.toString() === chatRoomId) {                
                // Delete some attributes in the object
                // that should not be stored in the state
                delete data.type
                delete data.event

                setChatMessagesState({
                    messages: [
                        ...chatMessagesState.messages,
                        data
                    ]
                });
            }
        }        
    };

    // Helper function to map the messages list and generate 
    // a list of ChatMessage components
    const renderChatMessages = () => {
        return chatMessagesState.messages.map(message => 
            <ChatMessage message={message.text} 
                         key={message.id} 
                         user={message.user}
                         activeUser={user}
                         created={message.created} />
        );
    }

    // Function that renders the add user button only when
    // the chat is public ('private' is false)
    const renderAddUserButton = () => {
        if (!chatState.private) {
            return (
                <IconButton color="primary">
                    <GroupAddRounded />
                </IconButton>
            );
        }
        return null;
    }

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

                    <Grid item>{chatState.chat_name}</Grid>

                    <Grid item className={classes.addUserButtonContainer}>
                        { renderAddUserButton() }
                    </Grid>

                </Grid>

                <div className={classes.chatMessages} 
                     ref={chatMessagesRef}>
                    {renderChatMessages()}
                </div>

                <Grid container 
                      className={classes.chatSubmit}
                      justify="space-between">

                    <TextField id="message" 
                               name="message"
                               label="Press ENTER to send the message"
                               className={classes.message}
                               value={messageState.message}
                               autoFocus
                               onChange={onChangeMessageHandler}
                               onKeyPress={onKeyPressHandler}                       
                               inputRef={inputMessage} />

                    <IconButton color="primary" 
                                className={classes.submitMessageButton}
                                onClick={submitMessageHandler}>
                        <Send />
                    </IconButton>

                </Grid>              

            </div>
            
        </Container>
    );
}