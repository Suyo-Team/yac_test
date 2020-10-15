import React, { useState } from 'react'
import { loginUser, registerUser } from '../store/actions/user'
import { connect } from 'react-redux'
function Login(props) {
    const [user] = useState({})
    const [flag, setFlag] = useState({ message: "", error: false })
    const [flare, setFlaRe] = useState(false)
    async function __onSubmit(event) {
        flag.error = false
        event.preventDefault()
        if (!flare) {
            const { data } = await props.login(user)

            console.log(data)
            if (!data.error) {
                props.history.push("/home")
            } else {
                setFlag(data)
            }
        }else{
            const { data } = await props.register(user)
            if(!data.error){
                props.history.push("/home")
            }else{
                setFlag(data)
            }
        }

        // props.history.push("/home", { user })
    }
    return (
        <div className="container-fluid" style={{ height: "100vh" }}>
            <div className="row justify-content-center align-items-center h-100">
                <div className="col-md-6">
                    <form onSubmit={__onSubmit}>
                        <div className="form-group">
                            <h3 style={{ color: "white" }}>ChatFri</h3>
                        </div>
                        {
                            (flag.error) &&
                            <div className="alert alert-danger" role="alert">
                                {flag.message}
                            </div>
                        }

                        {
                            (!flare) ?
                                (<>
                                    <div className="form-group">
                                        <input type="text" className="form-control" aria-describedby="emailHelp" placeholder="Username" required onChange={(event) => user.user = event.target.value} />
                                    </div>
                                    <div className="form-group">
                                        <input type="password" className="form-control" aria-describedby="emailHelp" placeholder="Password" required onChange={(event) => user.password = event.target.value} />
                                    </div>
                                    <div className="form-group">
                                        <p className="text-white">Don't have an account? <span className="text-secondary" style={{ cursor: "pointer" }} onClick={() => setFlaRe(!flare)}>Sign up</span></p>
                                    </div>
                                    <div className="form-group justify-content-end d-flex">
                                        <button type="submit" className="btn btn-light">Log in</button>
                                    </div>
                                </>)
                                :
                                (
                                    <>
                                        <div className="form-group">
                                            <input type="text" className="form-control" aria-describedby="emailHelp" placeholder="Name" required onChange={(event) => user.name = event.target.value} />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" className="form-control" aria-describedby="emailHelp" placeholder="Username" required onChange={(event) => user.user_name = event.target.value} />
                                        </div>
                                        <div className="form-group">
                                            <input type="email" className="form-control" aria-describedby="emailHelp" placeholder="Email" required onChange={(event) => user.email = event.target.value} />
                                        </div>
                                        <div className="form-group">
                                            <input type="password" className="form-control" aria-describedby="emailHelp" placeholder="Password" required onChange={(event) => user.password = event.target.value} />
                                        </div>
                                        <div className="form-group">
                                            <p className="text-white">Have an account? <span className="text-secondary" style={{ cursor: "pointer" }} onClick={() => setFlaRe(!flare)}>Log in</span></p>
                                        </div>
                                        <div className="form-group justify-content-end d-flex">
                                            <button type="submit" className="btn btn-light">Sign up</button>
                                        </div>
                                    </>
                                )
                        }

                    </form>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.userReducer.userList
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: async (user) => dispatch(await loginUser(user)),
        register: async (user) => dispatch(await registerUser(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)