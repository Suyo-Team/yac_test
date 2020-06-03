/**
 * Helper component that displays either an error or the result of 
 * of a request. will show a loading spinner also while the request is made
 */

import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles((theme) => ({
    container: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
}));


export default function DisplayResultOrError(props){

    const classes = useStyles();

    const { isLoading, somethingWentWrong } = props;

    // Function to render the 'result' if the request was made successfully
    // if there were an error in the request, it will render the somethingWentWrong message
    // Also, will display a 'loading' while the request is made
    const renderResults = () => {
        if (isLoading) {
            return <div className={classes.container}><CircularProgress /></div>
        } else if (somethingWentWrong.code) {
            return <div className={classes.container}>SomethingWentWrong.message</div>
        } else {
            return props.children
        }
    }

    return renderResults()
}

DisplayResultOrError.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    somethingWentWrong: PropTypes.object.isRequired
}

