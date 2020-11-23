import React from 'react'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { selectedChat } from '../store/action/selectedChatAction'
import { firestoreConnect } from 'react-redux-firebase';
import ChatListComponent from '../components/conversation/chat-list/ChatList'

function ChatListContainer({chats, selectedChat }){
    return (
        <ChatListComponent chats={chats} handleOnClick={(data) => selectedChat(data)} />
    )
}
const mapStateProps = (state) => {
    return {
        nickname: state.authReducer.isAuth.nickname,
        chats: state.firestore.ordered.chats
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        selectedChat: (data) => dispatch(selectedChat(data)),
    };
};
  
export default compose(
    connect(mapStateProps, mapDispatchToProps),
    firestoreConnect((props) => {
      return [
        { collection: 'users',
          doc: props.nickname,
          subcollections: [
            {
              collection: 'chats',
            },
          ],
          storeAs: 'chats',
        },
      ];
    }),
  )(ChatListContainer);