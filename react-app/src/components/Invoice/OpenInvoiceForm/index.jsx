import { useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useReactToPrint } from 'react-to-print';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import Invoice from 'components/Invoice/Invoice'
import InvoiceForm from 'components/Invoice/InvoiceForm'
import { validate } from 'utils/utils'
import { invoiceFormFields } from 'store/mockups/settings.json'
import { saveInvoice } from 'store/slices/documentSlice'
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const OpenInvoiceForm = () => {
    const { products } = useSelector(state => state.cart)
    const { payments } = useSelector(state => state.payment)
    const { person } = useSelector(state => state.document.data)
    const [hasErrors, setHasErrors] = useState(false)
    const dispatch = useDispatch()
    const data = useSelector(state => state.document.data)
    
    const componentRef = useRef();

    const doPrint = useReactToPrint({
      content: () => componentRef.current,
    });

    const { showInvoiceForm } = useSelector(state => state.state)

    const printInvoice = () => { 
        const errors = validate(invoiceFormFields, {...data.person})
        if(Object.keys(errors).length > 0) {
            setHasErrors(true)
            dispatch({ type: 'document/showErrors', payload: true })
        } else {
            setHasErrors(false)
            dispatch(saveInvoice({
                person,
                products,
                payments
            }))
            dispatch({ type: 'document/setHeader', payload: { number: '0001', date: '31-12-2020', exchange: 450000 } })
            doPrint() 
        }
    }

    const toggleOpen  = () => dispatch({ type: 'state/toogleShowInvoiceForm' })

    return (
    <Dialog open={showInvoiceForm} onClose={toggleOpen} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Datos del Cliente</DialogTitle>
        <DialogContent>
            <InvoiceForm />
            <div style={{ display: "none" }}><Invoice  ref={componentRef} /></div>
        </DialogContent>
        <DialogActions>
            <Button onClick={toggleOpen} color="secondary">Cancelar</Button>
            <Button onClick={printInvoice} color="primary">Imprimir</Button>
        </DialogActions>
        <Snackbar open={hasErrors} autoHideDuration={6000} >
                <Alert severity="error" onClose={() => setHasErrors(false)}>El formulario presenta errores o no esta completo</Alert>
        </Snackbar>
    </Dialog>
    )
}


export default OpenInvoiceForm