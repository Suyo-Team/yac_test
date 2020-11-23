import React from 'react'
import JdialogCreateComponent from '../components/create-room/jdialog-create/JdialogCreate'
import { createChatEachUser } from '../services/chat'
export default function JdialogCreateContainer ({ open, onClose }) {
  const tryCreateChat = async (data, users) => {
    try {
      await createChatEachUser(data, users.slice(1))
    } catch (e) {
      alert(e)
    }
  }
  return (
    <JdialogCreateComponent tryCreateChat={tryCreateChat} open={open} onClose={onClose} />
  )
}
