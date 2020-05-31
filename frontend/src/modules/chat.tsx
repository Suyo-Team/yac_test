import { useEffect, useState } from 'react';
import Router from 'next/router';
import { timeDifference } from '../utils/utils';
import io from 'socket.io-client';
import { API } from '../redux/constants';
const socket = io(API.URL);

const Chat = (props: ChatProps) => {
  const [chatText, setChatText] = useState('');
  const [count, setCount] = useState(0);

  useEffect(() => {
    const socketRoom = {
      room: 'chatRoom',
      id: props.user.key,
    };
    socket.emit('joinRoom', socketRoom);

    socket.on('newMessage', function (data) {
      props.addMessage(data);
    });

    socket.on('countUsers', function (number) {
      setCount(number);
    });

    props.loadMessageSuccess();
    return () => {
      socket.emit('leftRoom', socketRoom);
    };
  }, []);

  useEffect(() => {
    if (!props.user.key) {
      Router.replace('/');
    }
  }, [props.user.key]);

  useEffect(() => {
    var objDiv = document.getElementById('chat-box');
    objDiv.scrollTop = objDiv.scrollHeight;
  }, [props.messages]);

  const changedTextHandle = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setChatText(event.target.value);
  };

  const saveMessage = () => {
    const msg = {
      name: props.user.name,
      msg: chatText,
      code: props.user.key,
      room: 'chatRoom',
    };
    socket.emit('createMessage', msg);
    setChatText('');
  };

  const keyPressHandle = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    console.log(event.key);
    if (event.key === 'Enter') {
      saveMessage();
    }
  };

  const renderMessages = () => {
    if (!props.messages) {
      return null;
    }
    const currentTime = Date.now();
    return Object.keys(props.messages).map((key, index) => {
      const { code, name, msg, date } = props.messages[key];
      const validate = code != props.user.key;
      return (
        <div
          key={index}
          className={`d-flex ${
            validate ? 'justify-content-start' : 'justify-content-end'
          }  mb-4`}
        >
          {validate && <label className="name-label">{name}</label>}
          <div className={`msg_cotainer${validate ? '' : '_send'}`}>
            {msg}
            <span className={`msg_time${validate ? '' : '_send'}`}>
              {timeDifference(currentTime, date)}
            </span>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center h-100">
        <div className="col-md-11 col-xl-11 chat">
          <div className="card card-custom">
            <div className="card-header msg_head">
              <div className="d-flex bd-highlight">
                <div className="user_info">
                  <span>Chat Test Suyo</span>
                </div>
              </div>
              <div className="user_info">
                <span>Users connected #{count}</span>
              </div>
              <span id="action_menu_btn">
                <button
                  type="button"
                  id="sendlogin"
                  className="btn btn-primary"
                  onClick={props.logOut}
                >
                  Log out
                </button>
              </span>
            </div>
            <div id="chat-box" className="card-body msg_card_body">
              {renderMessages()}
            </div>
            <div className="card-footer">
              <div className="input-group">
                <textarea
                  value={chatText}
                  onChange={changedTextHandle}
                  onKeyPress={keyPressHandle}
                  className="form-control type_msg"
                  placeholder="Type your message..."
                ></textarea>
                <div className="input-group-append" onClick={saveMessage}>
                  <span className="input-group-text send_btn">
                    <i className="fas fa-location-arrow"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
