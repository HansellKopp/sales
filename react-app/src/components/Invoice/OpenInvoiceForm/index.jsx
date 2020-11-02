import { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useReactToPrint } from 'react-to-print';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Invoice from 'components/Invoice/Invoice'
import InvoiceForm from 'components/Invoice/InvoiceForm'

const OpenInvoiceForm = () => {
    const dispatch = useDispatch()
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
    });
    const { showInvoiceForm } = useSelector(state => state.state)

    const printInvoice = () => { handlePrint() }

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
    </Dialog>
    )
}


export default OpenInvoiceForm