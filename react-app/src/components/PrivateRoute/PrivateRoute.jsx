import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect } from "react-router-dom"

const PrivateRoute = ({ children, ...rest }) => {
  const { user } = useSelector(state => state.auth)
  return (
      <Route 
        {...rest}
        render={({ location }) => (user && user.active) ?
          children :
          (<Redirect
            to={{
              pathname: "/login/",
              state: { from: location }
            }}
          />)
        }
      />  
    )
  }

export default PrivateRoute 