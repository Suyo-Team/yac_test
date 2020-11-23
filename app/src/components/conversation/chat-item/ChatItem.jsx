import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import ImageIcon from '@material-ui/icons/Image'
import moment from 'moment'

const useStyles = makeStyles(() => ({
  label: {
    color: '#e1e9f1'
  },
  item: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#36404a'
    }
  }
}))

const mapStateProps = (state) => {
  return {
    chatSelected: state.selectedChatReducer.chatSelected
  }
}

function ChatItem ({ id, url, name_chat, last_message, time, handleOnClick, chatSelected }) {
  const classes = useStyles()

  const IsActive = chatSelected && id === chatSelected.id

  return (
    <ListItem onClick={() => handleOnClick({ id, url, name_chat, last_message })} className={classes.item} style={{ backgroundColor: IsActive && '#36404a' }}>
      <ListItemAvatar>
        <Avatar alt='avatar' src={url}>
          <ImageIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText classes={{ secondary: classes.label, primary: classes.label }} primary={name_chat} secondary={last_message} />
      <ListItemText classes={{ secondary: classes.label }} secondary={time && moment(time.toDate().toISOString()).format('LTS')} />
    </ListItem>
  )
}

export default connect(mapStateProps, null)(ChatItem)
