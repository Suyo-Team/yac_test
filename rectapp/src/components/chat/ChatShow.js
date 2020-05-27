import React, { Fragment } from "react";

const ChatShow = ({ clients }) => {
  return (
    <Fragment>
      {clients ? (
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
            <span>{clients}</span>
            <p>Online</p>
          </div>
        </div>
      ) : null}
    </Fragment>
  );
};

export default ChatShow;
