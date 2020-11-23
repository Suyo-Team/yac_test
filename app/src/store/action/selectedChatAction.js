export const selectedChat = (chat) => {
    return (dispatch) => {
      dispatch({ type: 'CHAT_SELECTED', chat });
    };
  };