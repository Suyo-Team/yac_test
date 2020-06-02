import React, { 
    useState, 
    useRef, 
    useLayoutEffect, 
    useEffect 
} from 'react';
import { useParams, useRouteMatch } from "react-router-dom";

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackRounded from '@material-ui/icons/ArrowBackRounded';
import GroupAddRounded from '@material-ui/icons/GroupAddRounded';
import Send from '@material-ui/icons/Send';
import TextField from '@material-ui/core/TextField';
import useStayScrolled from 'react-stay-scrolled';
import { blue } from '@material-ui/core/colors';

import APIKit from '../APIKit';
import CustomLink from '../CustomLink';
import ChatMessage from './ChatMessage';
import { getUser } from '../CheckUserAuthenticated';
import AddUserToChat from '../dialogs/AddUserToChat';

import PropTypes from 'prop-types';
import ReconnectingWebSocket from 'reconnecting-websocket';

import { useInterval } from '../utils';
import IsTyping from './IsTyping';
import DisplayResultOrError from '../DisplayResultOrError';
import ChatMessagesList from './ChatMessagesList';

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
        borderBottom: "solid 5px",
        borderBottomColor: blue[100],
        padding: '5px 10px',
        background: blue[600],
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
    },
    addUserButton: {
        color: blue[100]
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
        users: []
    });

    // State to manage the 'is loading' status of the retrieved messages
    const [messagesLoading, setMessagesLoading] = useState(true);
    // State to manage the 'errors' from the server
    const [somethingWentWrong, setSomethingWentWrong] = useState({
        code: null,
        errorMessage: ''
    });

    // State to handle the 'is typing' event
    const [isTyping, setIsTyping] = useState(false);
    const [lastTypedTime, setLastTypedTime] = useState(null);
    // State that will contain the list of all the users that are
    // typing on a specific chat
    const [isTypingState, setIsTypingState] = useState([]);

    const checkIsTyping = () => {       
        let timestamp = new Date().getTime();
        const difference = timestamp - lastTypedTime;
        if (isTyping && difference > 700) {
            setIsTyping(false);
            setLastTypedTime(null);
        }
    }
    useInterval(() => {
        checkIsTyping();
    }, isTyping ? 500 : null);

    // Now, we can use an effect to broadcast a message vi websocket
    // to inform the user stoped or started typing
    useEffect(() => {
        let ws_event = isTyping ? 'user_typing' : 'user_stopped_typing'
        // Here socket.send
        socket.send(JSON.stringify({
            'event': ws_event,
            'type': ws_event.replace(/_/g, '.'),
            'id': user.id,
            'username': user.username,
            'chat': chatRoomId
        }));
    }, [isTyping]);


    // Fecthignt he chat information via API
    useEffect(() => {
        let mounted = true;

        const fetchData = async () => {
            const result = await APIKit.get(`/api/chats/${chatRoomId}/`);
            if (mounted) {
                setChatMessagesState({messages: result.data.chat_messages});
                setChatState({
                    id: result.data.id,
                    chat_name: result.data.chat_name,
                    private: result.data.private,
                    users: result.data.users
                });
                setMessagesLoading(false);
            }
        };        
        fetchData();
        
        return () => {
            mounted = false;
        };
        
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
            setIsTyping(false);
            setLastTypedTime(null);
        } else {
            // 'typing' function
            // We'll calculate the time between the last time the user
            // pressed a key and the current time
            // if it's longer than certain amount of time, we can 
            // say that 'the user stopped typing'.
            if (!isTyping) setIsTyping(true);
            const timestamp = new Date().getTime();
            setLastTypedTime(timestamp);
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
            
            await APIKit.post('/api/messages/', payload);      
    
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
        const event = data.event
        // Delete some attributes in the object
        // that should not be stored in the state
        delete data.type
        delete data.event
        // If event is 'new_message'
        if (event === 'new_message') {
            // then we check that the chat id of the message that is being received
            // matches the current chat room. If so, we added to the messages state, and
            // therefore, it's being rendered to the screen
            if (data.chat.toString() === chatRoomId) { 
                setChatMessagesState({
                    messages: [
                        ...chatMessagesState.messages,
                        data
                    ]
                });
            }
        } else if (event === 'new_user_added') {
            // We should keep track of this, serialized data
            // can be changed overtime in the server
            
            // If the user was added to this specific chat room
            if (data.id.toString() === chatRoomId) {                
                setChatState({
                    ...chatState,
                    users: data.users
                });
            }
        } else if (event === 'user_typing' || event === 'user_stopped_typing')
            // Only add the user to the list if it's not the active user
            // and if it's on the current chat
            if (data.chat.toString() === chatRoomId && data.id !== user.id) {
                if (event === 'user_typing') {                
                    setIsTypingState([
                        ...isTypingState,
                        data
                    ])
                } else if (event === 'user_stopped_typing') {
                    setIsTypingState(
                        isTypingState.filter(el => {
                            return el.id !== data.id
                        })
                    )
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
                <IconButton className={classes.addUserButton}
                            onClick={handleClickOpen}>
                    <GroupAddRounded />
                </IconButton>
            );
        }
        return null;
    }

    // Dialog Add User State
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
                      className={classes.chatRoomHeader}>

                    <Grid item>
                        <CustomLink tag={IconButton} 
                                    to='/chats' 
                                    color="secondary">
                            <ArrowBackRounded />
                        </CustomLink>
                    </Grid>

                    <Grid item><strong>{chatState.chat_name}</strong></Grid>

                    <Grid item className={classes.addUserButtonContainer}>
                        { renderAddUserButton() }
                    </Grid>

                </Grid>

                
                <div className={classes.chatMessages} 
                     ref={chatMessagesRef}>

                    <ChatMessagesList isLoading={messagesLoading} 
                                      somethingWentWrong={somethingWentWrong} 
                                      messagesList={chatMessagesState.messages}
                                      user={user}/>
                </div>               

                <IsTyping chat={chatRoomId} 
                          activeUser={user.id}
                          typingList={isTypingState} />

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

            <AddUserToChat open={open}          
                           onClose={handleClose} 
                           users={ chatState.users.map(u => u.id) } />
            
        </Container>
    );
}



ChatRoom.propTypes = {
    socket: PropTypes.instanceOf(ReconnectingWebSocket).isRequired
}