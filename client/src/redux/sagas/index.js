import loginUserSaga from "./loginUser";
import signupUserSaga from "./signupUser";
import { fork } from "redux-saga/effects";

export default function* rootSaga() {
  yield fork(loginUserSaga);
  yield fork(signupUserSaga);
}
