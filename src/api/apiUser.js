import * as Routes from './apiRutas';
import axios from 'axios';

const { LOGIN, REGISTER, GETCHAT, SETCHAT } = Routes.ROUTES


export async function apiLogin(user) {
    const { data } = await axios.post(LOGIN, user)

    return data
}

export async function apiRegister(user) {
    const { data } = await axios.post(REGISTER, user)

    return data
}

export async function getChat() {
    const { data } = await axios.get(GETCHAT)

    return data
}


export async function setChat(message) {
    const { data } = await axios.post(SETCHAT, message)
    return data
}