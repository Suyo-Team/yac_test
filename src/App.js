import React from 'react';
import Chat from './pages/Chat'
import Home from './pages/Home'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

function App() {

  return (
    <Router>
      <div>
        <Switch>
          <Route path="/chat" component={Chat}/>
          <Route path="/" component={Home} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
