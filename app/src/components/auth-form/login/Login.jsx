import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import useInputValue from '../../../hooks/useInputValue';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://static.wixstatic.com/media/1038a5_bb10e8f2fdff4c918ef2a23ce988645c~mv2.jpg/v1/fill/w_1048,h_553,al_c,q_85,usm_0.66_1.00_0.01/1038a5_bb10e8f2fdff4c918ef2a23ce988645c~mv2.webp)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login({ tryLogin }) {
  const classes = useStyles();
  const email = useInputValue('');
  const password = useInputValue('');
  const handleOnSubmit = (e) => {
      e.preventDefault()
      tryLogin({
          email: email.value,
          password: password.value
      })
  }
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <img alt='' src='https://static.wixstatic.com/media/2d07ea_988eb38e78f140029a2451dfeaad7e30~mv2.png/v1/fill/w_224,h_80,al_c,q_85,usm_0.66_1.00_0.01/2d07ea_988eb38e78f140029a2451dfeaad7e30~mv2.webp' className={classes.avatar} />
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form onSubmit={handleOnSubmit} className={classes.form} >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              value={email.value} 
              onChange={email.onChange}
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              value={password.value} 
              onChange={password.onChange}
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/register" >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}