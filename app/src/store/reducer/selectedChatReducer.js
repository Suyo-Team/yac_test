const initState = {
  chatSelected: { }
}

const selectedChatReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CHAT_SELECTED':
      return {
        ...state,
        chatSelected: action.chat
      }
    default:
      return state
  }
}

export default selectedChatReducer
