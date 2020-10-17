import { SEND_LOGIN, LOGGEDIN_FAILED, LOGGEDIN_SUCCESSFUL } from "../action/authenticateUser";

const defaultState = { authToken: "", username: "", password: "", error: "" }

//TODO: the field error is so the user can have some feedback, implement it
function reducer(state = defaultState, { type, payload }){
    switch (type) {
        case SEND_LOGIN:
            return { ...state, ...payload };
        case LOGGEDIN_SUCCESSFUL:
            return { ...state, ...payload };
        case LOGGEDIN_FAILED:
            return { ...state, ...payload };
        default:
            return state
            
    }

}

export default reducer;
