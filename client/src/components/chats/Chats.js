import React, {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import AddCircleRounded from '@material-ui/icons/AddCircleRounded';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useRouteMatch
  } from "react-router-dom";

import APIKit from '../APIKit';

import ChatItem from './ChatItem';
import { getUser } from '../CheckUserAuthenticated';
import ChatRoom from '../chatroom/ChatRoom';

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


// export default function Chats(props) {

//     let match = useRouteMatch();

//     return (
//         <Router>                
//             <Switch>
//                 <Route path={`${match.path}/:chatRoomId`} exact>
//                     <ChatRoom socket={props.socket} />
//                 </Route>
//                 <Route path={match.path} exact>
//                     <ChatsInnerComponent socket={props.socket} />
//                 </Route>
//             </Switch>
//         </Router>
//     );
// }

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