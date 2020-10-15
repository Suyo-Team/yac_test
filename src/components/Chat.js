import React, { useEffect, useState, useRef } from 'react'
import { Redirect } from "react-router-dom";
import SocketIO from 'socket.io-client';
const ENDPOINT = "http://localhost:4000/";
let socket = ""
function Chat(props) {
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState([])
    const [redirctTo, setRedirctTo] = useState(false);
    const msgEl = useRef(null)
    useEffect(() => {
        socket = SocketIO(ENDPOINT)

        socket.emit("joinRoom", { "username": props.user, "room": props.room })

        socket.on("roomUsers", ({ room, users }) => {
            console.log(room, users)
        })
        socket.on("message", message => {
            setMessages(oldMessages => [...oldMessages, message])
            msgEl.current.scrollTop = msgEl.current.scrollHeight
        })
        return () => {
            setMessages([])
            socket.disconnect()
        };

    }, [props.room])
    return (
        <div className="col-md-8" style={{ height: "100%", }}>
            <div className="col-md-12 p-2" ref={msgEl} style={{ overflow: "auto", maxHeight: "85%", height: "85%", maxWidth: "100%" }}>
                {messages.map((item, index) => (
                    <div className="col py-1 mt-1" style={{ background: "#2f3136", display: "flex", flexDirection: "column", justifyContent: "center" }} key={index}>
                        <p className="p-0 m-0" style={{ color: "white" }}>{item.username !== "ChatFriend" && item.username}</p>
                        <p className="p-0 m-0" style={{ wordWrap: "break-word", color: "gray" }}>{item.text}</p>
                    </div>
                ))}
            </div>
            <div className="col-md-12 mt-2" style={{ background: "#40444b" }} >
                <form action="">
                    <textarea type="text" value={message} className="form-control" placeholder="Message" onChange={(message) => {
                        setMessage(message.target.value)
                        msgEl.current.scrollIntoView({ behavior: 'smooth' })
                    }} 
                    onKeyPressCapture={(event) => {
                        if (event.key === "Enter") {
                            event.preventDefault()
                            socket.emit("chatMessage", message)
                            setMessage("")
                        }
                    }} style={{ background: "transparent", color: "#ffffed", borderWidth: 0, outline: 0, resize: "none" }} />
                </form>
            </div>
        </div>
    )
}

export default Chat
