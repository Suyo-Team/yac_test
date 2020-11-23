export const signIn = (info) => {
    return (dispatch) => {
      dispatch({ type: 'INFO_AUTH', info });
    };
  };