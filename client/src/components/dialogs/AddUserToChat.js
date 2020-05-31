/**
 * Dialog Component launched when user wants to add a new user to a chat.
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRouteMatch } from 'react-router-dom';

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
import PersonIcon from '@material-ui/icons/Person';
import Button from '@material-ui/core/Button';
import { blue } from '@material-ui/core/colors';

import APIKit from '../APIKit';

// Sytles
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


// Main component
export default function AddUserToChat(props) {
    
    // Classes to style the component
    const classes = useStyles();
    // Deconstructing the props
    const { onClose, open, users } = props;

    const match = useRouteMatch();

    // State to manage the list of users
    const [usersState, setUsersState] = useState({ users: [] });
    // State to manage the new user to be added
    const initialNewUserState = {newUser: {}};
    const [newUserState, setNewUserState] = useState(initialNewUserState);

    // Fetch the users list from the server
    useEffect(() => {
        let mounted = true;

        // We'll only make the api call to retrieve the list of users when the
        // dialog is opened ('open' is set to true true)
        if (open) {
            const fetchData = async () => {
                const result = await APIKit.get('/users/');
                // We need to remove the all the users already in the chat
                const filtered_users = result.data.filter(u => !users.includes(u.id))
                if (mounted) setUsersState({ users: filtered_users });
            };
            fetchData();
        }
        return () => {
            mounted = false;
        };
        
    }, [open]);

    // Helper function to execute everytime the component is closed
    const handleClose = () => {
        // We excecute the external function passed trhough the props
        onClose();
        // Reset the chat configuration state
        setNewUserState(initialNewUserState);
    };

    // Function to handle the new chat creation
    const handleAddNewUser = async () => {

        const payload = [
            ...users,
            newUserState.newUser.id
        ]

        // Patch to -> chats/{chat_id}
        await APIKit.patch(`${match.url}`, payload);

        handleClose();
    };

    // Function excecuted when a user is selected from the list
    const handleListItemClick = user => setNewUserState({newUser: user});

    return (
        <Dialog onClose={handleClose} 
                aria-labelledby="simple-dialog-title" 
                open={open}
                fullWidth
                maxWidth="xs">
            
            <DialogTitle id="add-user-dialog-title">
                Add User to the Chat
            </DialogTitle>

            <DialogContent>
                <List>
                    {usersState.users.map((user) => (
                        <ListItem button 
                                  onClick={() => handleListItemClick(user)} key={user.id}
                                  className={user.id === newUserState.newUser.id ? classes.selectedUser : null}>
                            
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

            <DialogActions>

                <Button autoFocus onClick={handleClose} color="secondary">
                    Cancel
                </Button>

                <Button onClick={handleAddNewUser} 
                        color="primary"
                        variant="outlined"
                        autoFocus>
                    Add { newUserState.newUser ? newUserState.newUser.username : 'a user' }
                </Button>

            </DialogActions>     
                
        </Dialog>
    );
}

AddUserToChat.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    users: PropTypes.array.isRequired
};
