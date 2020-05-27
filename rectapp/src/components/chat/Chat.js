import React, { useState, useEffect, Fragment } from "react";

/*Components */
import ChatUsers from "./ChatUsers";
import ChatMessages from "./ChatMessages";
import Navbar from "./Navbar";
import * as io from "socket.io-client";

const socket = io.connect("http://localhost:5000");

const Chat = () => {
  const [ClientsOnline, setClientsOnline] = useState([]);

  useEffect(() => {
    try {
      socket.open();
      socket.on("connect", () => {
        socket.emit("clientIsConnect", {
          username: localStorage.getItem("username"),
        });
      });
      socket.on("disconnect", () => {
        socket.emit("clientIsDisconnect", {
          username: localStorage.getItem("username"),
        });
      });
      socket.on("clientIsConnect", (data) => {
        setClientsOnline(data);
      });

      socket.on("clientIsDisconnect", (data) => {
        setClientsOnline(data);
      });
    } catch (error) {
      console.log(error);
    }
    return () => {
      socket.close();
    };
  }, []);

  return (
    <Fragment>
      <Navbar />
      <div className="row justify-content-center w-100">
        <ChatUsers ClientsOnline={ClientsOnline} />
        <ChatMessages />
      </div>
    </Fragment>
  );
};

export default Chat;
