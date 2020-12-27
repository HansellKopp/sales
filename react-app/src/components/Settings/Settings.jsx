import React,{ useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { 
  Card, CardActions, CardContent, Button, Typography, TextField, Paper
} from '@material-ui/core';

import useStyles from './styles.js'
import { validate } from 'utils/utils'
import { updateParameters } from 'store/slices/stateSlice'
import { settingsFields } from 'store/mockups/settings.json'

const Settings = () => {
  const classes = useStyles()
  const history = useHistory()
  const dispatch = useDispatch() 
  const [data, setData] = useState(null)
  const parameters = useSelector(state => state.state.parameters)
  const errors = validate(settingsFields, {...data})

  useEffect(() => {
    if(parameters) {
      setData(parameters)
    }
  },[parameters])

  const handleChange = (event) => {
    const target = event.target
    const newData = { ...data, [target.name]: target.value }
    setData(newData)
  }

  const home = () =>  history.push("/")

  const guardar = () => {
    if(Object.keys(errors).length===0) {
      dispatch(updateParameters(data))
      history.push("/")
    }
  } 

  if(!data) return null
  return (
    <Paper elevation={3} className={classes.root}>
    <Card>
      <CardContent>
        <Typography component="h2">
          Actualizar configuracion
        </Typography>
        <form noValidate autoComplete="off">                
          {Object.keys(settingsFields).map(key => {
              const error = errors[key] ? errors[key] : '' //loginErrors[key]
              const helperText = error ? error : settingsFields[key].helperText
              return (
                  <TextField
                      key={key}
                      name={key}
                      size='medium'
                      margin="normal"
                      value={data[key] || ''}
                      onChange={handleChange}
                      InputLabelProps={{ shrink: true }}
                      label={settingsFields[key].label}
                      helperText={helperText || ''}
                      type={settingsFields[key].type}
                      fullWidth={settingsFields[key].fullWidth || false}
                      placeholder={settingsFields[key].placeholder || ''}
                      error={!!error}
                  /> 
              )
          }
          )}
        </form>
      </CardContent>
      <CardActions className={classes.actions} >
        <Button onClick={home}>Cancelar</Button>
        <Button prima onClick={guardar}>Guardar</Button>
      </CardActions>
    </Card>
    </Paper>
  );
}

export default Settings