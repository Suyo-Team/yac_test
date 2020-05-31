import { connect } from 'react-redux';
import Chat from '../modules/chat';
import {
  loadMessageSuccess,
  addMessage,
} from '../reducers/chat/actions';
import { logOut } from '../reducers/user/actions';
import { AppState } from '../redux/store';

const mapStateToProps = (state: AppState) => {
  return {
    user: state.userReducer,
    messages: state.chatReducer.messages,
  };
};

const mapDispatchToProps = {
  loadMessageSuccess,
  addMessage,
  logOut
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
