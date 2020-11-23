import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import AccessTimeIcon from '@material-ui/icons/AccessTime'
import moment from 'moment'
import { Typography } from '@material-ui/core'

import './style.css'

export default function ChatMessages ({ ownMessages, color = '#7269ef', sender, content, url, time }) {
  return (
    <div
      className='chat__messages__root'
      style={{ flexDirection: ownMessages && 'row-reverse' }}
    >
      <div className='chat__messages__avatar'>
        <Avatar alt='Remy Sharp' src={url} />
      </div>
      <div className='chat__messages__text'>
        <SquareText color={color} content={content} time={time} />
        <p>{sender}</p>
      </div>

    </div>
  )
}

const SquareText = ({ color, content, time }) => (
  <div className='chat__square__text' style={{ backgroundColor: color }}>
    <p>{content}</p>
    <div className='chat__square__time'>
      <AccessTimeIcon style={{ fontSize: 'smaller', marginRight: '5px' }} />
      <Typography style={{ fontSize: '.8rem' }}>{time && moment(time.toDate().toISOString()).format('LTS')}</Typography>
    </div>
  </div>
)
