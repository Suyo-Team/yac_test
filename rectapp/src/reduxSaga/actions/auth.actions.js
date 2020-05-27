// Recibir las acciones
import { 
    LOGIN_START,
    LOGOUT,
    REGISTER_START,
} from "../../const/actionTypes";

export const authSignUp = payload => ({
    type: REGISTER_START,
    payload
})

export const authLogin = logindata => ({
    type: LOGIN_START,
    logindata
})

export const Logout = tokenLogout => ({
    type: LOGOUT,
    tokenLogout
})