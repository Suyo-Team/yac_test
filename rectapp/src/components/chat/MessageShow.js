import React, { Fragment } from "react";

const MessageShow = ({ data }) => {
  return (
    <Fragment>
      {data.username === localStorage.getItem("username") ? (
        /* I am */

        <div className="d-flex justify-content-end mb-4 messageBodyAll">
          <div className="msg_cotainer_send">
            <span className="text-white">{data.username}</span>
            <br />
            {data.message}
            <span className="msg_time_send">a las {data.hora}</span>
          </div>

          <div className="img_cont_msg">
            <img
              src="https://cdn3.iconfinder.com/data/icons/messenger-filled-line/128/07_Profile-512.png"
              className="rounded-circle user_img_msg"
              alt="user_image"
            />
          </div>
        </div>
      ) : (
        /* Them  */
        <div className="d-flex justify-content-start mb-4">
          <div className="img_cont_msg">
            <img
              src="https://cdn3.iconfinder.com/data/icons/messenger-filled-line/128/07_Profile-512.png"
              className="rounded-circle user_img_msg"
              alt="user_image"
            />
          </div>
          <div className="msg_cotainer">
            <span className="text-white">{data.username}</span>
            <br />
            {data.message}
            <span className="msg_time">a las {data.hora}</span>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default MessageShow;
