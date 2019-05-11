import React, { Component, useContext } from 'react'
import { Redirect } from 'react-router-dom'
import { GlobalContext } from '../lib/context'

const Page = () => {
  const context = useContext(GlobalContext)
  console.log('----> outer context', context)

  class AuthenticatedComponent extends Component {
    authed = true
    // authed = context.authed

    // componentDidMount() {
    //   console.log('----> inner context', context)
    // }

    render() {
      if (this.authed) {
        return <Page />
      }

      if (!this.authed) {
        return (
          <Redirect
            to={{
              pathname: '/',
              state: { from: this.props.location },
            }}
          />
        )
      }

      return null
    }
  }

  return AuthenticatedComponent
}

export default Page
