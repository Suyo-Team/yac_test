import React, {useState} from 'react';
import PropTypes from 'prop-types';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import UserListContainer from '../../../containers/UserListContainer'
import Button from '@material-ui/core/Button';
import useInputValue from '../../../hooks/useInputValue';

export default function JdialogCreate({ onClose, selectedValue, open, tryCreateChat }) {
  const name_chat = useInputValue('');
  const description = useInputValue('');
  const url = useInputValue('');
  const [users, setUsers] = useState([1])
  
  const handleClose = () => {
    onClose(selectedValue);
  };
  const handleOnClickCreate = () => {
    if(users.length <= 1){
        alert('you must choose a users!')
        return;
    }
    if(!name_chat.value || !description.value || !url.value){
        alert('field empty!!!')
        return;
    }
    tryCreateChat({name_chat: name_chat.value, last_message: description.value, url: url.value }, users)
    onClose()
  }
  return (
    <Dialog onClose={handleClose}  aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Create new room chat</DialogTitle>
      <div style={{padding: '0 10px'}} >
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={name_chat.value}
            onChange={name_chat.onChange}
            id="name_chat"
            label="Name Chat"
            name="chat"
            autoComplete="chat"
            autoFocus
        />
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={description.value}
            onChange={description.onChange}
            id="description"
            label="Description"
            name="description"
            autoComplete="description"
            autoFocus
        />
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={url.value}
            onChange={url.onChange}
            id="url"
            label="Url"
            name="url"
            autoComplete="url"
            autoFocus
        />
      </div>
      <UserListContainer selecteValue={(c) => setUsers(c)} />
      <Button onClick={handleOnClickCreate} variant="contained" color="primary">
        Create
      </Button>
    </Dialog>
  );
}

JdialogCreate.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};