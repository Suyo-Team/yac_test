export const SEND_LOGIN = "SEND_LOGIN";
export const LOGGEDIN_SUCCESSFUL = "LOGGEDIN_SUCCESSFUL";
export const LOGGEDIN_FAILED = "LOGGEDIN_FAILED";
export const SEND_SIGNUP = "SEND_SIGNUP";
export const SIGNUP_SUCCESSFUL = "SIGNUP_SUCCESSFUL";
export const SIGNUP_FAILED = "SIGNUP_FAILED";

export function sendLogin(username, password) {
  return {
    type: SEND_LOGIN,
    payload: {
      username,
      password,
    },
  };
}

export function sendSignup(username, password) {
  return {
    type: SEND_SIGNUP,
    payload: {
      username,
      password,
    },
  };
}
