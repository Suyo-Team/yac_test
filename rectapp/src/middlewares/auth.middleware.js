import * as io from "socket.io-client";
const socket = io.connect("http://localhost:5000");

export const setSession = (data) => {
  localStorage.setItem('token', data.key)
  localStorage.setItem('userid',data.user.id)
  localStorage.setItem('username',data.user.username)
}

export const destroySessions= () => {
  socket.emit('clientIsDisconnect',{username:localStorage.getItem('username')})
  localStorage.removeItem('token')
  localStorage.removeItem('userid')
  localStorage.removeItem('username')

  window.location.reload()
}

export const isAuth = () =>{
  if (localStorage.getItem('token') != null  ) {
    return true
  }else{
    return false
  }
}