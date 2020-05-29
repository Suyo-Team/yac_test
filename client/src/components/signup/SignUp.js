import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    // marginTop: theme.spacing(8),
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();

  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
    password2: ''
  });

  const [validPasswordsState, setValidPasswordsState] = useState({
    validPasswords: true
  });

  const submitRegisterHandler = (e) => {
    e.preventDefault();

    let validPasswords = false
    if (formState.password === formState.password2) {
      validPasswords = true
    }

    setValidPasswordsState({
      validPasswords: validPasswords
    })

    console.log(formState);
  }

  const onInputChangeHandler = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  }

  const showErrorInvalidPassowrds = () => {
    if (!validPasswordsState.validPasswords) {
      return (
        <Grid>
          <p>Passwords must match.</p>
        </Grid>
      );
    }
    return;
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={submitRegisterHandler} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                value={formState.username}
                onChange={onInputChangeHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={formState.email}
                onChange={onInputChangeHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={formState.password}
                onChange={onInputChangeHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password2"
                label="Confirm Password"
                type="password"
                id="password2"
                autoComplete="confirm-password"
                value={formState.password2}
                onChange={onInputChangeHandler}
              />
            </Grid>
          </Grid>
          {showErrorInvalidPassowrds()}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>         

          <Grid container justify="flex-end">
            <Grid item>
              <RouterLink to="/login">Already have an account? Sign in</RouterLink>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}