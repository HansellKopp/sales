import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ConfirmActionDialog(props) {
  const { open, toogleOpen, onConfirm, title, content } = props
  const accept = () => {
    toogleOpen()
    onConfirm()
  }
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={toogleOpen}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{title}</DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">{content}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={toogleOpen} color="primary">
            Cancelar
          </Button>
          <Button onClick={accept} color="primary">
            Confimar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}