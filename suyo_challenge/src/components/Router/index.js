/* import external modules */
import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

/* import internal modules */
const LazySignUp = lazy(() => import('../../pages/signUp'))
const LazyLogin = lazy(() => import('../../pages/login'))
const LazyRooms = lazy(() => import('../../pages/rooms'))

const RouterComponent = () => {
  return (
    <Router basename="/">
      <Suspense fallback={<h3>Loading...</h3>}>
        <Switch>
          <Route exact path="/" component={LazySignUp} />
          <Route path="/login" component={LazyLogin} />
          <Route path="/rooms" component={LazyRooms} />
        </Switch>
      </Suspense>
    </Router>
  )
}

export default RouterComponent
