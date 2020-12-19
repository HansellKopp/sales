import { useSelector, useDispatch } from 'react-redux'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import Button from '@material-ui/core/Button'
import ProductForm from 'components/Products/ProductForm/ProductForm'
import { saveProduct } from 'store/slices/productSlice'
import { useState } from 'react'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}

const ProductModal = () => {
    const dispatch = useDispatch()    
    const [open, setOpen] = useState(false)
    const toggleOpen  = () => dispatch({ type: 'state/toogleOpenProductForm' })
    const { showProductForm } = useSelector(state => state.state)
    const { product, errors } = useSelector(state => state.product)
    const hasErrors = Object.keys(errors).length > 0

    const save = () => {
        if(hasErrors) {
            setOpen(true)
            return
        }
        setOpen(false)
        dispatch(saveProduct(product))
        dispatch({ type: 'state/toogleOpenProductForm' })
    }

    return (
    <Dialog open={showProductForm} onClose={toggleOpen} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Datos del Producto</DialogTitle>
        <DialogContent>
            <ProductForm />
        </DialogContent>
        <DialogActions>
            <Button onClick={toggleOpen} color="secondary">Cancelar</Button>
            <Button onClick={save} color="primary">Aceptar</Button>
        </DialogActions>
        <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
                <Alert severity="error">El formulario presenta errores o no esta completo</Alert>
        </Snackbar>
    </Dialog>
    )
}


export default ProductModal