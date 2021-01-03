import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Button } from '@material-ui/core';
import { savePurchase } from 'store/slices/documentSlice';

import { validate } from 'utils/utils'
import { useStyles } from './style'
import { purchaseFormFields } from 'store/mockups/settings.json'


const PurchaseActions = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const history = useHistory()
    const purchase = useSelector(state => state.document.purchase)
    const { exchange } = useSelector(state => state.state.parameters)
    const clear = () => dispatch({ type: 'document/clearPurchase' })

    const save = () => {
        if(purchase.products.length<1) {
            console.log('No products')
            return
        }
        let errors = null
        errors = validate(purchaseFormFields, purchase.provider)
        if(Object.keys(errors).length>0) {
            return
        }
        const newPurchase = {...purchase, exchange}
        dispatch(savePurchase(newPurchase))
        history.push('/')
    }

    return (
    <div className={classes.root}>
        <Button 
            color="primary"
            variant="contained"
            onClick={save}
        >
        Guardar</Button>
        <Button 
            color="secondary"
            variant="contained"
            onClick={clear}
        >
        Limpiar</Button>
    </div>
    )
}

export default PurchaseActions