/* import external modules */
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import CloseIcon from '@material-ui/icons/Close'
import { withStyles } from '@material-ui/core/styles'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import MuiDialogActions from '@material-ui/core/DialogActions'
import { Button, Dialog, IconButton, Typography } from '@material-ui/core'

/* import internal modules */
import styles from './styles'
import { setSendMessage } from '../../../redux/actions/rooms'

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  )
})

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent)

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions)

const Modal = ({ children, title, openButtonTitle, actionButtonTitle }) => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const sendMessageRoomFunction = () => {
    dispatch(setSendMessage())
  }

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        {openButtonTitle}
      </Button>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {title}
        </DialogTitle>
        <DialogContent dividers>{children}</DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            autoFocus
            onClick={sendMessageRoomFunction}
            color="primary"
          >
            {actionButtonTitle}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Modal
