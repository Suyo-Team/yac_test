import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { useRouteMatch } from 'react-router-dom';
import CustomLink from '../CustomLink';

import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import PersonIcon from '@material-ui/icons/Person';
import Avatar from '@material-ui/core/Avatar';
import { blue } from '@material-ui/core/colors';

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

export default function ChatItem(props) {
    const classes = useStyles();
    const match = useRouteMatch();

    return (
        <CustomLink tag={ListItem}
                    to={`${match.url}/${props.id}`}
                    key={props.id} 
                    className={classes.chatItem}>
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={props.chat_name} />
        </CustomLink>
    );
}