import React from 'react'
import RegisterComponent from '../components/auth-form/login/Register'
import { registerEmailAndPassword, saveInStorage, searhNickname } from '../services/register'

export default function RegisterContainer(){
    const  handleRegister = async (data) => {
        try{
            if ((await searhNickname(data.nickname)).exists) {
                alert('Ops! change nickname')
            } else {
                let user = await registerEmailAndPassword(data.email, data.password)
                let d2 = data
                d2.uid = user.user.uid
                await saveInStorage(d2)
            }
        } catch(e) {
            alert(e)
        }
    }
    return (
        <RegisterComponent tryRegister={handleRegister} />
    )
}