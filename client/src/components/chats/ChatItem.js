import React from 'react';
import { useRouteMatch } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import CustomLink from '../CustomLink';
import Badge from '@material-ui/core/Badge';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import PersonIcon from '@material-ui/icons/Person';
import Avatar from '@material-ui/core/Avatar';
import { blue } from '@material-ui/core/colors';


// Styles
const useStyles = makeStyles((theme) => ({
    chatItem: {
        '&:hover': {
            backgroundColor: '#ececec',
            cursor: 'pointer'
        }
    },
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    }
}));


// Main Component
export default function ChatItem(props) {

    // Classes to style the componenet
    const classes = useStyles();

    const match = useRouteMatch();

    return (    
        <CustomLink tag={ListItem}
                    to={`${match.url}/${props.id}`}
                    key={props.id} 
                    className={classes.chatItem}>

            <ListItemAvatar>
                <Badge color="secondary" badgeContent={props.unread}>
                    <Avatar className={classes.avatar}>
                        <PersonIcon />
                    </Avatar>
                </Badge>  
            </ListItemAvatar>

            <ListItemText primary={props.chat_name} />

        </CustomLink>              
    );
}