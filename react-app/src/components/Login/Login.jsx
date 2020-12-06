import React,{ useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { 
  Card, CardActions, CardContent, Button, Typography, TextField, Paper
} from '@material-ui/core';

import { userLogin } from 'store/slices/authSlice'
import { validate } from 'utils/utils'
import useStyles from './styles.js'

import { loginFields } from 'store/mockups/settings.json'

const Login = () => {
  const classes = useStyles()
  const history = useHistory()
  const dispatch = useDispatch() 
  const [data, setData] = useState({})
  const errors = validate(loginFields, {...data})
  const { user } = useSelector(state => state.auth)
  const loginErrors = useSelector(state => state.auth.errors)

  useEffect(()=> {
    if(user.username) {
      history.push('/')
    }
    // eslint-disable-next-line 
  },[user.username])

  const handleChange = (event) => {
    const target = event.target
    const newData = { ...data, [target.name]: target.value }
    setData(newData)
  }

  const home = () =>  history.push("/")

  const login = () => {
    dispatch(userLogin(data))   
  } 

  return (
    <Paper elevation={3} className={classes.root}>
    <Card>
      <CardContent>
        <Typography component="h2">
          Login
        </Typography>
        <form noValidate autoComplete="off">                
          {Object.keys(loginFields).map(key => {
              const error = errors[key] ? errors[key] :loginErrors[key]
              const helperText = error ? 
                  error :
                  loginFields[key].helperText
                
              return (
                  <TextField
                      key={key}
                      name={key}
                      size='medium'
                      margin="normal"
                      value={data[key] || ''}
                      onChange={handleChange}
                      InputLabelProps={{ shrink: true }}
                      label={loginFields[key].label}
                      helperText={helperText || ''}
                      type={loginFields[key].type}
                      fullWidth={loginFields[key].fullWidth || false}
                      placeholder={loginFields[key].placeholder || ''}
                      error={!!error}
                  /> 
              )
          }
          )}
        </form>
      </CardContent>
      <CardActions className={classes.actions} >
        <Button onClick={login}>Login</Button>
        <Button onClick={home}>Cancelar</Button>
      </CardActions>
    </Card>
    </Paper>
  );
}

export default Login