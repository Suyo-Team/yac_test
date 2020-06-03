/**
 * Sign in page. Users will log in with their username and password.
 * Also provides a link that routes to the registration page
 * 
 * This Component is based in the material-ui templates find in their website
 * https://material-ui.com/getting-started/templates/
 */
import React, { useState } from 'react';
import { Link as RouterLink, useHistory } from "react-router-dom";
import Cookies from 'universal-cookie';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import APIKit, { setClientToken } from '../APIKit';

// Styles
const useStyles = makeStyles((theme) => ({
	paper: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));


// Main component
export default function SignIn() {

	console.log(3)
	// Classes to style the component
	const classes = useStyles();

	const cookies = new Cookies();
	const history = useHistory();

	// Form state, this will be sent to the API to make the login request
	const [formState, setFormState] = useState({
		username: '',
		password: ''
	});

	// Form submit handler
	const submitLoginHandler = async (e) => {
		e.preventDefault();

		const onSuccess = ({ data }) => {
			// set cookies with user info and token
			cookies.set('user', data.user);
			cookies.set('token', data.token);
			setClientToken(data.token);
			// Redirect to the Chats page
			history.push('/chats');
		};

		// Informative function for debuging
		const onFailure = error => {
			console.log(error && error.response);
		};

		// Make the API post request to login
		await APIKit.post('/api/login/', formState)
			.then(onSuccess)
			.catch(onFailure);
	}

	// Global handler for all the inputs in the form
	const onInputChangeHandler = (e) => {
		setFormState({
			...formState,
			[e.target.name]: e.target.value
		});
	}

	return (
		<Container component="main" maxWidth="xs">

			<CssBaseline />

			<div className={classes.paper}>

				<Avatar className={classes.avatar}><LockOutlinedIcon /></Avatar>

				<Typography component="h1" variant="h5">Sign in</Typography>

				<form className={classes.form}
					  onSubmit={submitLoginHandler}
					  noValidate>

					<TextField variant="outlined"
							   margin="normal"
							   required
							   fullWidth
							   id="username"
							   label="Username"
							   name="username"
							   autoComplete="username"
							   value={formState.username}
							   autoFocus
							   onChange={onInputChangeHandler} />

					<TextField variant="outlined"
							   margin="normal"
							   required
							   fullWidth
							   name="password"
							   label="Password"
							   type="password"
							   id="password"
							   autoComplete="current-password"
							   value={formState.password}
							   onChange={onInputChangeHandler} />

					<Button type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}>
						Sign In
					</Button>

					<Grid container>
						<Grid item>
							<RouterLink to="/register">{"Don't have an account? Sign Up"}</RouterLink>
						</Grid>
					</Grid>

				</form>

			</div>
			
		</Container>
	);
}