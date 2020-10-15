import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import Chat from '../components/Chat'
import { connect } from 'react-redux'
function Home(props) {
    console.log(props.user)
    const [room, setRoom] = useState("")
    const rooms = ["Chill 1"]
    if (!props.user.user_name) {
        return <Redirect to="/" />
    }
    return (
        <div>
            <div className="row p-0 m-0" style={{ height: "calc(100vh)" }}>
                <div className="col-md-4 p-3" style={{ overflow: "auto", maxHeight: "100vh", background: "#2f3136" }}>
                    <button className="btn btn-dark" onClick={(event) => {
                        event.preventDefault()
                        props.history.goBack()
                    }}>{"Log Out"}</button>
                    <hr />
                    {rooms.map((roommap, index) => (<p key={index} className="text-white p-2" style={{ cursor: "pointer", background: (roommap === room) ? "rgba(0,0,0,.3)" : "transparent" }} onClick={() => setRoom(roommap)}>{roommap}</p>))}
                </div>
                {
                    (room !== "") && <Chat user={props.user.user_name} room={room} />
                }
            </div>



        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.userReducer.user
    }
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         add: async (user) => dispatch(await addUser(user))
//     }
// }


export default connect(mapStateToProps)(Home)
