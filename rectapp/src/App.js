import React from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from "react-redux";

import Routes from './Routes';

console.disableYellowBox = true;

function App( { store } ) {
  console.log()
  return (
    <Provider store={store}>
      <Router>
        <Routes />
      </Router>
    </Provider>
  );
}

export default App;
