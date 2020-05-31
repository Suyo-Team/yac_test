import { actionTypes } from '../../redux/constants';

export const chatInitialState: ChatReducer = {
  messages: [],
};

function reducer(state = {...chatInitialState}, action) {
  switch (action.type) {
    case '__NEXT_REDUX_WRAPPER_HYDRATE__': {
      return { ...state, ...action.payload };
    }

    case actionTypes.GET_MESSAGES:
      return {
        ...state,
        messages: action.data,
      };

    case actionTypes.ADD_MESSAGE:
      return {
        ...state,
        messages: { ...state.messages, ...action.data },
      };

    default:
      return state;
  }
}

export default reducer;
