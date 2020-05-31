import { actionTypes } from '../../redux/constants';

export function login(data: Object) {
  return {
    type: actionTypes.LOGIN,
    data,
  };
}

export function register(data: Object) {
  return {
    type: actionTypes.REGISTER,
    data,
  };
}

export function set_null_error() {
  return {
    type: actionTypes.SET_NULL_ERROR,
  };
}

export function logOut() {
  return {
    type: actionTypes.LOG_OUT,
  };
}
