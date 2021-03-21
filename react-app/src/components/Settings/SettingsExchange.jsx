import React,{ useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import { 
  Card, CardActions, CardContent, Button, Typography, TextField, Paper
} from '@material-ui/core';

import useStyles from './styles.js'
import { validate } from 'utils/utils'
import { updateParameters } from 'store/slices/stateSlice'
import { settingsExchangeFields } from 'store/mockups/settings.json'

const SettingsExchange = () => {
  const classes = useStyles()
  const dispatch = useDispatch() 
  const [data, setData] = useState(null)
  const parameters = useSelector(state => state.state.parameters)
  const errors = validate(settingsExchangeFields, {...data})

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

  const guardar = () => {
    if(Object.keys(errors).length===0) {
      dispatch(updateParameters(data))
      dispatch({ type: 'state/toogleShowExchange' })
    }
  } 

  const home = () =>   dispatch({ type: 'state/toogleShowExchange' })

  if(!data) return null
  return (
    <Paper elevation={3} className={classes.root}>
    <Card>
      <CardContent>
        <Typography component="h2">
          Actualizar tasa de cambio
        </Typography>
        <form noValidate autoComplete="off">                
          {Object.keys(settingsExchangeFields).map(key => {
              const error = errors[key] ? errors[key] : '' //loginErrors[key]
              const helperText = error ? error : settingsExchangeFields[key].helperText
              return (
                  <TextField
                      key={key}
                      name={key}
                      size='medium'
                      margin="normal"
                      value={data[key] || ''}
                      onChange={handleChange}
                      InputLabelProps={{ shrink: true }}
                      label={settingsExchangeFields[key].label}
                      helperText={helperText || ''}
                      type={settingsExchangeFields[key].type}
                      fullWidth={settingsExchangeFields[key].fullWidth || false}
                      placeholder={settingsExchangeFields[key].placeholder || ''}
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

export default SettingsExchange