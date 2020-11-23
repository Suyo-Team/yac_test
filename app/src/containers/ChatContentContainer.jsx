import React from 'react'
import ChatContentComponent from '../components/conversation/chat-content/ChatContent'
import { sendMessage } from '../services/chat'
import { signOut } from '../services/auth'


export default function ChatContentContainer(){
    const trySendMessage = async ({ message, chatInfo, senderInfo }) => {
        await sendMessage(chatInfo.id, { content: message, sender: senderInfo.nickname, url: senderInfo.url })
    }
    return (
        <ChatContentComponent signOut={() => signOut()} handleSubmit={trySendMessage} />
    )
}