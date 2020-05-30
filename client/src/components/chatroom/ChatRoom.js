import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
// import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackRounded from '@material-ui/icons/ArrowBackRounded';
import GroupAddRounded from '@material-ui/icons/GroupAddRounded';
import Send from '@material-ui/icons/Send';
import TextField from '@material-ui/core/TextField';
import useStayScrolled from 'react-stay-scrolled';
import { useParams } from "react-router-dom";
import APIKit from '../APIKit';

import CustomLink from '../CustomLink';
import ChatMessage from './ChatMessage';

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
        height: '100%',
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
    }
}));

export default function ChatRoom(props) {
    const classes = useStyles();

    let { chatRoomId } = useParams();
    
    const socket = props.socket;

    const inputMessage = useRef(null);
    const chatMessagesRef = useRef();

    const { stayScrolled } = useStayScrolled(chatMessagesRef);
 
    const [messageState, setMessageState] = useState({
        message: ''
    });

    const [chatMessagesState, setChatMessagesState] = useState({
        messages: []
    });

    const [chatState, setChatState] = useState({
        id: null,
        chat_name: '',
        private: true,
        users: [],
    });

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

    useLayoutEffect(() => {
            stayScrolled();
        }, [chatMessagesState.messages.length]
    );

    const onChangeMessageHandler = (e) => {
        setMessageState({
            message: e.target.value
        });
    }

    const onKeyPressHandler = (e) => {
        if (e.key === 'Enter') {
            submitMessageHandler();
        }
    }

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

    socket.onmessage = function(e) {
        const data = JSON.parse(e.data);
        console.log(data.event);
        console.log(data.chat.toString(), typeof data.chat.toString());
        console.log(chatRoomId, typeof chatRoomId);
        if (data.event === 'new_message') {
            if (data.chat.toString() === chatRoomId) {
                
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

    const renderChatMessages = () => {
        return chatMessagesState.messages.map(message => 
            <ChatMessage 
                message={message.text} 
                key={message.id} 
                user={message.user.username}
                created={message.created}
            />
        );
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
                    <Grid item>
                        {chatState.chat_name}
                    </Grid>
                    <Grid item>
                        <IconButton color="primary">
                            <GroupAddRounded />
                        </IconButton>
                    </Grid>
                </Grid>

                <div className={classes.chatMessages} 
                    ref={chatMessagesRef}>

                    {renderChatMessages()}
                </div>

                <Grid container className={classes.chatSubmit} justify="space-between">
                    <TextField 
                        id="message" 
                        name="message"
                        label="Press ENTER to send the message"
                        className={classes.message}
                        value={messageState.message}
                        autoFocus
                        onChange={onChangeMessageHandler}
                        onKeyPress={onKeyPressHandler}                       
                        inputRef={inputMessage}
                    />
                    <IconButton 
                        color="primary" 
                        className={classes.submitMessageButton}
                        onClick={submitMessageHandler}>
                        <Send />
                    </IconButton>
                </Grid>              
            </div>
        </Container>
    );
}