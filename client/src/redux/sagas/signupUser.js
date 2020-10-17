import { call, put, takeLatest } from "redux-saga/effects";
import {
  SEND_SIGNUP,
  SIGNUP_SUCCESSFUL,
  SIGNUP_FAILED,
} from "../action/authenticateUser";
import Api from "../../Api";

function* postSignup(action) {
  try {
    const user = yield call(
      Api.postSignup,
      action.payload.username,
      action.payload.password
    );
    
    yield put({
      type: SIGNUP_SUCCESSFUL,
      payload: { authToken: user.data.apiToken },
    });
  } catch (e) {
    yield put({ type: SIGNUP_FAILED, payload: { error: e.message } });
  }
}

function* signupSaga() {
  yield takeLatest(SEND_SIGNUP, postSignup);
}

export default signupSaga;
