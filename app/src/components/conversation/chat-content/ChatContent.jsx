import React, {useState} from 'react';
import { connect } from 'react-redux';
import EmojiPicker from 'emoji-picker-react';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import Avatar from '@material-ui/core/Avatar';
import ChatListMessagesContainer from '../../../containers/ChatListMessagesContainer'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import IconButton from '@material-ui/core/IconButton';
import { Typography } from '@material-ui/core';
import useInputValue from '../../../hooks/useInputValue';
import './style.css'

const mapStateProps = (state) => {
    return {
        chatSelected: state.selectedChatReducer.chatSelected,
        isAuth: state.authReducer.isAuth,
    };
};
function ChatContent({ chatSelected, signOut, handleSubmit, isAuth }){
    const [showEmoji, setShowEmoji] = useState(false)
    const message = useInputValue('');

    return (
        <div className='chat__content__root'>
            <div className='chat__content__top'>
                <div>
                    <Avatar src={chatSelected && chatSelected.url} />
                    <Typography variant="h6">{chatSelected && chatSelected.name_chat}</Typography>
                </div>
            </div>
            <div className='chat__content__middle'>
                <ChatListMessagesContainer />
            </div>
            <div className='chat__content__bottom'>
                <form onSubmit={(e) => {
                    e.preventDefault()
                    handleSubmit({ message: message.value, chatInfo: chatSelected, senderInfo: isAuth })
                    message.reset()
                }}>
                    <input disabled={!chatSelected} value={message.value} onChange={message.onChange} placeholder='Enter Message..' /> 
                    <EmojiEmotionsIcon onClick={() => setShowEmoji(!showEmoji)} />
                </form>
                <IconButton onClick={signOut} style={{color: '#b5bbcf'}} aria-label="upload picture" component="span">
                   <ExitToAppIcon />
                </IconButton>
                <div>
                    { showEmoji && <EmojiPicker /> }
                </div>
            </div>
        </div>
    )
}

export default connect(mapStateProps, null)(ChatContent)