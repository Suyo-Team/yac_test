import React, { Fragment, useEffect} from "react";
import { Route, useHistory } from 'react-router-dom';


/*Components */
import Authentication from "./components/auth/Authentication";
import Chat from "./components/chat/Chat";

/* Middleaware*/
import { isAuth } from './middlewares/auth.middleware';


function Routes() {
  const history = useHistory();
  useEffect(() => {
    isAuth() ? history.push('/chat') : history.push('/') 
  }, [])

  return (
    <Fragment>
      <Route  exact path="/" component={Authentication} />
      <Route  exact path="/chat" component={Chat} />
    </Fragment>
  );
}

export default Routes;
