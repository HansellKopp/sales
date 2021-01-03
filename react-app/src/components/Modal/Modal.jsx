import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'

const Modal = (props) => {
    const { title, open, toggleOpen, accept } = props

    return (
    <Dialog open={open} onClose={toggleOpen} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{title}</DialogTitle>
        <DialogContent>
        {props.children}
        </DialogContent>
        <DialogActions>
            <Button onClick={toggleOpen} color="secondary">Cancelar</Button>
            <Button onClick={accept} color="primary">Aceptar</Button>
        </DialogActions>
    </Dialog>
    )
}


export default Modal