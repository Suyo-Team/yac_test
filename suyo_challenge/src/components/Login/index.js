/* import external modules */
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import {
  Avatar,
  Button,
  TextField,
  Grid,
  Typography,
  Container,
} from '@material-ui/core'
import { useDispatch } from 'react-redux'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'

/* import internal modules */
import useStyles from './styles'
import { setUser } from '../../redux/actions/user'
import { getUserByEmailApi, loginApi } from '../../apis/users'

const Login = () => {
  let history = useHistory()
  const dispatch = useDispatch()
  const classes = useStyles()
  const [errorPassword, setErrorPassword] = useState({
    error: false,
    helperText: '',
  })
  const [dataUser, setDataUser] = useState({
    email: '',
    password: '',
  })

  useEffect(() => {
    passwordValidations(null, dataUser.password)
  }, [dataUser.password])

  const handleChange = (event) => {
    setDataUser({
      ...dataUser,
      [event.target.name]: event.target.value,
    })
  }

  const passwordValidations = (event, password) => {
    if (password) {
      if (password.length <= 6) {
        if (event) {
          event.preventDefault()
        }
        setErrorPassword({
          error: true,
          helperText: 'Min 6 characters.',
        })
      }
      if (password.length > 6 || password.length === 0) {
        setErrorPassword({
          error: false,
          helperText: '',
        })
      }
    }
  }

  const getUserByEmailFunction = (email) => {
    getUserByEmailApi(email)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, ' => ', doc.data())
          dispatch(setUser(doc.data()))
          history.push('/rooms')
        })
      })
      .catch(function (error) {
        console.log('Error getting documents: ', error)
      })
  }

  const loginValidation = (event) => {
    const { email, password } = dataUser

    passwordValidations(event, password)

    if (email && password.length > 6) {
      event.preventDefault()
      loginApi(email, password)
        .then(() => {
          getUserByEmailFunction(email)
        })
        .catch((error) => {
          // Handle Errors here.
          var errorMessage = error.message

          setErrorPassword({
            error: true,
            helperText: errorMessage,
          })
        })
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                onChange={handleChange}
                value={dataUser.email}
                type="email"
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={handleChange}
                value={dataUser.password}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                error={errorPassword.error}
                helperText={errorPassword.helperText}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(event) => loginValidation(event)}
          >
            Login
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/" variant="body2">
                ¿Don't have an account? Sign up
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
}

export default Login
