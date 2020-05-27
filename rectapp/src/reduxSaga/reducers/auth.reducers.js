import * as actionTypes from "../../const/actionTypes";
import { setSession, destroySessions } from "../../middlewares/auth.middleware";

const initialState = {
  token: null,
  error: null,
  login_error: null,
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_START:
      return { ...state, login_error: false};
    case actionTypes.REGISTER_START:
      return { ...state};
    case actionTypes.LOGIN_SUCCESS:
      setSession(action.logindata);
      return { ...state, token: action.logindata };
    case actionTypes.REGISTER_SUCCESS:
      setSession(action.payload);
      return { ...state, token: action.payload };
    case actionTypes.LOGIN_FAIL:
      return { ...state, login_error: true, error: action.logindata };
    case actionTypes.REGISTER_FAIL:
      return { ...state, error: action.payload };
    case actionTypes.LOGOUT:
      destroySessions();
      return { ...state };
    default:
      return state;
  }
};

export default reducer;
