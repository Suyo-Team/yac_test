import { LOGIN_USER, REGISTER_USER, REMOVE_USER } from '../actions/types'

const initialState = {
    user: []
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER:
            return {
                ...state,
                user: state.user = action.user
            };
        case REGISTER_USER:
            return {
                ...state,
                user: state.user = action.user
            }
        default:
            return state
    }
}

export default userReducer