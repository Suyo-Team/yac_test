import { actionTypes } from '../../redux/constants';

export function loadMessageSuccess(data: Object) {
  return {
    type: actionTypes.GET_MESSAGES,
    data,
  };
}

export function addMessage(data: Object) {
  return {
    type: actionTypes.ADD_MESSAGE,
    data,
  };
}
