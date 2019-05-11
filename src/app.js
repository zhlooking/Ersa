import React, { lazy, useState, useContext } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { NoMatch, Waiting } from '@/components'
import Login from './login'
import { GlobalContext } from '../lib/context'

const Home = lazy(() => import('./home'))

export default () => {
  const initialValue = {
    authed: true,
    userInfo: { name: 'foo', age: 20 },
  }
  const [globalValue, setGlobalValue] = useState(initialValue)

  return (
    <GlobalContext.Provider value={globalValue} update={setGlobalValue}>
      <Switch>
        <Route path="/login" component={Login} />
        <PrivateRoute path="/home" component={Waiting(Home)} />
        <Route component={NoMatch} />
      </Switch>
    </GlobalContext.Provider>
  )
}

function PrivateRoute({ component: Component, ...rest }) {
  const { authed } = useContext(GlobalContext)

  return (
    <Route
      {...rest}
      render={props =>
        authed ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  )
}
