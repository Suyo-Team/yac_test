/* import external modules */
import React, { useEffect, useState } from 'react'
import {
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Typography,
} from '@material-ui/core'
import { Link, useHistory } from 'react-router-dom'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'

/* import internal modules */
import useStyles from './styles'
import { createUser, getUser, signUp } from '../../apis/handleUsers'

const SignUp = () => {
  let history = useHistory()
  const classes = useStyles()
  const [allowExtraEmails, setAllowExtraEmails] = useState(false)
  const [errorNickname, setErrorNickname] = useState({
    error: false,
    helperText: '',
  })
  const [errorEmail, setErrorEmail] = useState({
    error: false,
    helperText: '',
  })
  const [errorPassword, setErrorPassword] = useState({
    error: false,
    helperText: '',
  })
  const [dataUser, setDataUser] = useState({
    nickname: '',
    fullname: '',
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

  const handleChangeCheckbox = (event) => {
    setAllowExtraEmails(event.target.checked)
  }

  const setErrorNicknameFunction = (error, helperText) => {
    setErrorNickname({
      error,
      helperText,
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

  const signUpFunction = (email, password) => {
    setErrorEmail({
      error: false,
      helperText: '',
    })

    signUp(dataUser.email, dataUser.password)
      .then(() => {
        history.push('/home')
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code
        var errorMessage = error.message

        console.error(errorCode, errorMessage)
        setErrorEmail({
          error: true,
          helperText: errorMessage,
        })
      })
  }

  const createUserFunction = (userInfo) => {
    createUser({ ...dataUser, allowExtraEmails })
      .then(() => {
        signUpFunction(dataUser.email, dataUser.password)
      })
      .catch((error) => {
        console.error('Error writing document: ', error)
      })
  }

  const executeUserFlow = () => {
    /* Validation nickname exist */
    getUser({ ...dataUser, allowExtraEmails })
      .get()
      .then((doc) => {
        if (doc.exists) {
          setErrorNicknameFunction(true, 'Cant be 2 people with same nickname.')
        } else {
          setErrorNicknameFunction(false, '')
          createUserFunction({ ...dataUser, allowExtraEmails })
        }
      })
      .catch(function (error) {
        console.log('Error getting document:', error)
      })
  }

  const signUpValidation = (event) => {
    const { nickname, fullname, email, password } = dataUser

    passwordValidations(event, password)

    if (
      nickname &&
      fullname &&
      email &&
      password.length > 6 &&
      allowExtraEmails
    ) {
      event.preventDefault()
      executeUserFlow()
    }
  }

  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <form className={classes.form}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <TextField
              onChange={handleChange}
              value={dataUser.nickname}
              autoComplete="nickname"
              name="nickname"
              variant="outlined"
              required
              fullWidth
              id="nickname"
              label="Nickname"
              autoFocus
              error={errorNickname.error}
              helperText={errorNickname.helperText}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              onChange={handleChange}
              value={dataUser.fullname}
              variant="outlined"
              required
              fullWidth
              id="fullname"
              label="Full Name"
              name="fullname"
              autoComplete="lname"
            />
          </Grid>
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
              error={errorEmail.error}
              helperText={errorEmail.helperText}
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
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  required
                  color="primary"
                  onChange={handleChangeCheckbox}
                  value={allowExtraEmails}
                />
              }
              label="I want to receive inspiration, marketing promotions and updates via email."
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={(event) => signUpValidation(event)}
        >
          Sign Up
        </Button>
        <Grid container justify="flex-end">
          <Grid item>
            <Link to="/login" variant="body2">
              ¿Already have an account? Login
            </Link>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}

export default SignUp
