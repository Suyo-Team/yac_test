import React from 'react'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { selectedChat } from '../store/action/selectedChatAction'
import { firestoreConnect } from 'react-redux-firebase';
import UserListComponent from '../components/create-room/user-list/UserList'

function UserListContainer({ users, selecteValue }){
    return (
        <UserListComponent selecteValue={selecteValue} users={users}  />
    )
}
const mapStateProps = (state) => {
    return {
        nickname: state.authReducer.isAuth.nickname,
        users: state.firestore.ordered.users
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
        { 
          collection: 'users',
          storeAs: 'users',
        },
      ];
    }),
  )(UserListContainer);