import React, { Fragment, useEffect, useState } from "react";

/* Components */
import MessagesList from "./MessagesList";
import { apiCall } from "../../services/services.config";

/* Socket */
import io from "socket.io-client";

const socket = io(`http://localhost:5000`);

const ChatMessages = ({ data }) => {
  const [sendMessage, setMessage] = useState({
    usuario: localStorage.getItem("username"),
    message_send: "",
    hora: "",
  });
  const { message_send } = sendMessage;
  const [recieveMessage, setRecieveMessage] = useState("");
  const [emptyMessage, setEmptyMessage] = useState(true);

  useEffect(() => {
    
    try {
      apiCall("saveMessages/", null, null, "GET").then((response) => {
        setRecieveMessage(response.data);
        setEmptyMessage(false);
      });

    } catch (error) {
      setRecieveMessage("");
    }
    socket.on("mensajeEnviar", (data) => {
      setRecieveMessage((old) => [...old, data]);
      let messageBody = document.querySelector("#messageBody");
      messageBody.scrollTop = messageBody.scrollHeight;
    });
    return () => {
      socket.close()
    };
  }, []);

  const SendMessageFunction = (e) => {
    if( message_send != ''){
      socket.emit("mensajeEnviar", sendMessage);
      setMessage({
        ...sendMessage,
        message_send: ''
      })
    }
  };

  const handleTest = (e) => {
    if (e.charCode === 13 && message_send != '') {
      SendMessageFunction();
    }
  };

  const handleChange = (e) => {
    setMessage({
      ...sendMessage,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Fragment>
      <div className="col-md-8 col-xl-6 chat">
        <div className="card">
          <div className="card-header msg_head">
            <div className="d-flex bd-highlight">
              <div className="img_cont">
                <img
                  src="https://cdn3.iconfinder.com/data/icons/messenger-filled-line/128/07_Profile-512.png"
                  className="rounded-circle user_img"
                  alt="user_image"
                />
                <span className="online_icon"></span>
              </div>
              <div className="user_info">
                <span>Room</span>
                <p>Chat with other people!</p>
              </div>
              <div className="video_cam">
                <span>
                  <i className="fas fa-video"></i>
                </span>
                <span>
                  <i className="fas fa-phone"></i>
                </span>
              </div>
            </div>
          </div>
          <div className="card-body msg_card_body" id="messageBody">
            {emptyMessage ? null : (
              <MessagesList recieveMessage={recieveMessage} />
            )}
          </div>
          <div className="card-footer">
            <div className="input-group">
              <div className="input-group-append">
                <span className="input-group-text attach_btn">
                  <i className="fas fa-paperclip"></i>
                </span>
              </div>
              <input
                name="message_send"
                value={message_send}
                className="form-control type_msg"
                placeholder="Escribe un mensaje..."
                onChange={handleChange}
                onKeyPress={handleTest}
              />
              <div className="input-group-append">
                <span
                  className="input-group-text send_btn"
                  onClick={SendMessageFunction}
                >
                  <i className="fa fa-arrow-right"></i>{" "}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ChatMessages;
