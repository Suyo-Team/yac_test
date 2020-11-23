import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import IconButton from '@material-ui/core/IconButton'
import JdialogCreateContainer from '../../../containers/JdialogCreateContainer'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    gridArea: 'chat-new',
    display: 'flex',
    alignItems: 'center',
    maxWidth: 350,
    borderTopLeftRadius: 15,
    backgroundColor: '#303841',
    '& > *': {
      margin: theme.spacing(1),
      color: 'white'
    }
  }
}))

export default function IconButtons () {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  return (
    <div className={classes.root}>
      <JdialogCreateContainer open={open} onClose={() => setOpen(false)} />
      <IconButton onClick={() => setOpen(true)} aria-label='add'>
        <AddCircleIcon fontSize='large' />
      </IconButton>
      <Typography variant='h6'>New Chat</Typography>
    </div>
  )
}
