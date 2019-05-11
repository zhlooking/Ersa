import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import '../styles/pages/login.scss'

export default function Login(props) {
  const [redirectToReferrer, setRedirectToReferrer] = useState(false)

  const login = () => {
    setRedirectToReferrer(true)
  }

  const { from } = props.location.state || { from: { pathname: '/' } }

  if (redirectToReferrer) {
    return <Redirect to={from} />
  }

  return (
    <div>
      <p>Bar You must log in to view the page at {from.pathname}</p>
      <button onClick={login}>Log in</button>
    </div>
  )
}
