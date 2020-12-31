import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

import useStyles from './style'

export default function SelectRange(props) {
  const { open, toogleOpen, onConfirm, title } = props
  const [range, setRange] = React.useState({from: props.range.from, to: props.range.to});

  const handleChange = (field, value) => {
    const newRange = {...range}
    newRange[field] = value
    setRange(newRange)
  }

  const accept = () => {
    toogleOpen()
    onConfirm(range)
  }
  const classes = useStyles();
  return (
      <Dialog
        open={open}
        keepMounted
        onClose={toogleOpen}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{title}</DialogTitle>
        <div className={classes.content}>
            <TextField
              id="date_from"
              label="Desde"
              type="date"
              value={range.from}
              className={classes.textField}
              onChange={(e) => handleChange('from', e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="date_to"
              label="Hasta"
              type="date"
              value={range.to}
              className={classes.textField}
              onChange={(e) => handleChange('to', e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
        </div>
        <DialogActions>
          <Button onClick={toogleOpen} color="primary">
            Cancelar
          </Button>
          <Button onClick={accept} color="primary">
            Confimar
          </Button>
        </DialogActions>
      </Dialog>
  );
}