import { call, put, takeLatest } from "redux-saga/effects";
import {
  SEND_LOGIN,
  LOGGEDIN_SUCCESSFUL,
  LOGGEDIN_FAILED,
} from "../action/authenticateUser";
import Api from "../../Api";

function* postLogin(action) {
  try {
    const user = yield call(
      Api.postLogin,
      action.payload.username,
      action.payload.password
    );
    yield put({
      type: LOGGEDIN_SUCCESSFUL,
      payload: { authToken: user.data.authToken },
    });
  } catch (e) {
    yield put({ type: LOGGEDIN_FAILED, payload: { error: e.message } });
  }
}

function* loginSaga() {
  yield takeLatest(SEND_LOGIN, postLogin);
}

export default loginSaga;
