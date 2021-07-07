import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
  useHistory,
} from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './layouts/Dashboard'
import { PrivateRoute, PublicRoute } from './components/RouteHOC'

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  const user = useSelector((state) => state.auth.user)
  const history = useHistory()
  const [authenticated, setAuthenticated] = useState(isLoggedIn)
  useEffect(() => {
    setAuthenticated(isLoggedIn)
  }, [isLoggedIn])  
  useEffect(() => {
    if (user === '') history.push('/login')
  }, [user, history])
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {authenticated ? (
            <Redirect to="/dashboard" />
          ) : (
            <Login setAuthenticated={setAuthenticated} />
          )}
        </Route>
        <PrivateRoute
          path="/dashboard"
          authenticated={authenticated}
          component={Dashboard}
        />
        <PublicRoute
          path="/login"
          authenticated={authenticated}
          component={Login}
        />
      </Switch>
    </Router>
  )
}

export default App
