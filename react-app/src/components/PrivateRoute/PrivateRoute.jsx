import React from 'react'
import { Route, Redirect } from "react-router-dom"

const PrivateRoute = ({ children, ...rest }) => {
  const { user } = {isLogged: true} 
  return (
      <Route 
        {...rest}
        render={({ location }) => (user && user.isLogged) ?
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