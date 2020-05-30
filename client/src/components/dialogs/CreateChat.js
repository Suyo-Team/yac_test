import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import PersonIcon from '@material-ui/icons/Person';
import TextField from '@material-ui/core/TextField';
import { blue } from '@material-ui/core/colors';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import APIKit from '../APIKit';

const useStyles = makeStyles({
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
    selectedUser: {
        backgroundColor: blue[600],
        '&:hover': {
            backgroundColor: blue[100]
        }
    }
});

export default function CreateChat(props) {
    const classes = useStyles();
    const { onClose, selectedValue, open } = props;

    const [usersState, setUsersState] = useState({ users: [] });
    const [newChatState, setNewChatState] = useState({
        private: true,
        chat_name: '',
        selectedUser: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            const result = await APIKit.get('/users/');

            setUsersState({ users: result.data });
        };
        fetchData();
    }, []);

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = (user) => {
        setNewChatState({
            ...newChatState,
            selectedUser: user.id
        });

        console.log(newChatState.selectedUser)
    };

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="create-chat-dialog-title">Create a new Chat</DialogTitle>
            <DialogContent>
                <FormControlLabel
                    control={
                    <Checkbox
                        checked={newChatState.private}
                        // onChange={handlePrivateChange}
                        name="private"
                        color="primary"
                    />
                    }
                    label="Private"
                />
                <TextField
                    margin="dense"
                    id="chat_name"
                    label="Chat Name"
                    type="text"
                    fullWidth
                    disabled={true}
                />
            </DialogContent>
            <DialogContent>
                <List>
                    {usersState.users.map((user) => (
                        <ListItem 
                            button 
                            onClick={() => handleListItemClick(user)} key={user.id}
                            className={user.id === newChatState.selectedUser ? classes.selectedUser : null}
                        >
                            <ListItemAvatar>
                                <Avatar className={classes.avatar}>
                                    <PersonIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={user.username} />
                        </ListItem>
                    ))}
                </List>
            </DialogContent>           
        </Dialog>
    );
}

CreateChat.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
};
