import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

import useStyles from './style'

export default function SelectDate(props) {
  const { open, toogleOpen, onConfirm, title } = props
  const [date, setDate] = React.useState(props.date);

  const handleChange = (value) => setDate(value)

  const accept = () => {
    toogleOpen()
    onConfirm(date)
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
        <div className={classes.container}>
            <TextField
              id="date"
              label="Fecha"
              type="date"
              value={date}
              className={classes.textField}
              onChange={(e) => handleChange(e.target.value)}
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