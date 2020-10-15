import { LOGIN_USER, REGISTER_USER, REMOVE_USER } from './types'
import { apiUser } from '../../api'
export const loginUser = async (user) => {
    const data = await apiUser.apiLogin(user)
    return {
        type: LOGIN_USER,
        data,
        user: (data.user) ? data.user : {}
    }
}

export const registerUser = async (user) => {
    const data = await apiUser.apiRegister(user)
    return {
        type: REGISTER_USER,
        data,
        user: (data.user) ? data.user : {}
    }
}

export const deleteUser = (user) => (
    {
        type: REMOVE_USER,
        data: user
    }
)