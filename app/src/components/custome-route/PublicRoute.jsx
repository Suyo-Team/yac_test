import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const PublicRoute = ({ component: Component, authentification, restricted, ...rest }) => {
  return (
    <Route
      {...rest} render={props => (
        authentification && restricted
          ? <Redirect to='/chat' />
          : <Component {...props} />
      )}
    />
  )
}

export default PublicRoute
