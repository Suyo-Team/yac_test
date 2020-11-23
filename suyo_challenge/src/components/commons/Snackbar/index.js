/* import external modules */
import { useState } from 'react'
import { Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'

const SnackbarComponent = (props) => {
  const [open, setOpen] = useState(true)

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <MuiAlert
        onClose={handleClose}
        severity="success"
        elevation={6}
        variant="filled"
        {...props}
      >
        This is a success message!
      </MuiAlert>
    </Snackbar>
  )
}

export default SnackbarComponent
