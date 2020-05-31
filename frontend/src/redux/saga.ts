import { all, call, put, take } from 'redux-saga/effects';
import es6promise from 'es6-promise';

import { login, register } from '../reducers/user/actions';
import { loadMessageSuccess } from '../reducers/chat/actions';

import { actionTypes, API } from './constants';
import { createFetchParams } from '../utils/utils';

es6promise.polyfill();

function* rootSaga() {
  yield all([call(loginUser), call(registerUser), call(getMessages)]);
}

function* loginUser() {
  while (true) {
    const { data } = yield take(actionTypes.LOGIN);
    try {
      const res = yield fetch(
        `${API.URL}${API.SIGN_IN}`,
        createFetchParams('POST', data)
      );
      const response: Object = yield res.json();
      yield put(login(response));
    } catch (err) {
      alert(err);
    }
  }
}

function* registerUser() {
  while (true) {
    const { data } = yield take(actionTypes.REGISTER);
    try {
      const res = yield fetch(
        `${API.URL}${API.SIGN_UP}`,
        createFetchParams('POST', data)
      );
      const response: Object = yield res.json();
      yield put(register(response));
    } catch (err) {
      alert(err);
    }
  }
}

function* getMessages() {
  while (true) {
    const { data } = yield take(actionTypes.GET_MESSAGES);
    try {
      const res = yield fetch(
        `${API.URL}${API.GET_MESSAGES}`,
        createFetchParams('GET', data)
      );
      const response: Object = yield res.json();
      yield put(loadMessageSuccess(response));
    } catch (err) {
      alert(err);
    }
  }
}

export default rootSaga;
