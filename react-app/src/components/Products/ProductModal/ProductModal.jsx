import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import Button from '@material-ui/core/Button'
import ProductForm from 'components/Products/ProductForm/ProductForm'
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}

const ProductModal = () => {
    const dispatch = useDispatch()    
    const [hasErrors, setHasErrors] = useState(false)
    const toggleOpen  = () => dispatch({ type: 'state/toogleOpenProductForm' })
    const { showProductForm } = useSelector(state => state.state)

    return (
    <Dialog open={showProductForm} onClose={toggleOpen} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Datos del Producto</DialogTitle>
        <DialogContent>
            <ProductForm />
        </DialogContent>
        <DialogActions>
            <Button onClick={toggleOpen} color="secondary">Cancelar</Button>
        </DialogActions>
        <Snackbar open={hasErrors} autoHideDuration={6000} >
                <Alert severity="error" onClose={() => setHasErrors(false)}>El formulario presenta errores o no esta completo</Alert>
        </Snackbar>
    </Dialog>
    )
}


export default ProductModal