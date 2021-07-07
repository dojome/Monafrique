import React from 'react'
import { Route, Redirect } from 'react-router-dom'

export function PrivateRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated === true ? (
          <Component {...props} authenticated />
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        )
      }
    />
  )
}

export function PublicRoute({ component: Component, authenticated, ...rest }) {
  console.log(authenticated)
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated === false ? (
          <Component {...props} setTokens={rest.setTokens} />
        ) : (
          <Redirect to="/dashboard" />
        )
      }
    />
  )
}
