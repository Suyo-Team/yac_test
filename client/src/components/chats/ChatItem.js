import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { useRouteMatch } from 'react-router-dom';
import CustomLink from '../CustomLink';

const useStyles = makeStyles((theme) => ({
    chatItem: {
        borderBottom: "solid 1px grey",
        '&:hover': {
            backgroundColor: 'lightgrey',
            cursor: 'pointer'
        },
        padding: '5px 10px'
    }
}));

export default function ChatItem(props) {
    const classes = useStyles();
    const match = useRouteMatch();

    return (
        <CustomLink tag={Grid} 
                    to={`${match.url}/${props.id}`}
                    container
                    justity="center"
                    key={props.id} 
                    className={classes.chatItem}>
            <h3>{props.chat_name}</h3>
        </CustomLink>
    );
}