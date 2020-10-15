import * as Routes from './apiRutas';
import axios from 'axios';

const { LOGIN, REGISTER, CHAT } = Routes.ROUTES


export async function apiLogin(user) {
    const { data } = await axios.post(LOGIN, user)

    return data
}

export async function apiRegister(user) {
    const { data } = await axios.post(REGISTER, user)

    return data
}

export async function getChat() {
    const { data } = await axios.get(CHAT)

    return data
}