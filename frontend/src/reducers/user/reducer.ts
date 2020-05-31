import { actionTypes } from '../../redux/constants';
export const userInitialState: ReducerUser = {
  name: '',
  key: '',
  error: null,
};

function reducer(state = { ...userInitialState }, action) {
  switch (action.type) {
    case '__NEXT_REDUX_WRAPPER_HYDRATE__': {
      return { ...state, ...action.payload };
    }

    case actionTypes.LOGIN:
      return {
        ...state,
        ...action.data,
      };

    case actionTypes.REGISTER:
      return {
        ...state,
        ...action.data,
      };

    case actionTypes.SET_NULL_ERROR:
      return {
        ...state,
        error: null,
      };

    case actionTypes.LOG_OUT:
      return {
        name: '',
        key: '',
        error: null,
      };
    default:
      return state;
  }
}

export default reducer;
