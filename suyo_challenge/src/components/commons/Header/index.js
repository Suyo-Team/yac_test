/* import external modules */
import React from 'react'
import { useHistory } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core'

/* import internal modules */
import useStyles from './styles'

export default function ButtonAppBar() {
  let history = useHistory()
  const classes = useStyles()

  const goToLogin = () => {
    history.push('/login')
  }

  const goToSignUp = () => {
    history.push('/')
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Suyo Chat Challenge
          </Typography>
          <Button color="inherit" onClick={goToSignUp}>
            Sign Up
          </Button>
          <Button color="inherit" onClick={goToLogin}>
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}
