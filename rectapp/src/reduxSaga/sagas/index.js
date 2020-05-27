import { all } from 'redux-saga/effects';
import {auth_login , auth_signup} from './auth.saga';


export default function* rootSaga() {
	yield all([
		auth_login(),
		auth_signup()	
	]);
}