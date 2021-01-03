import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Modal from 'components/Modal/Modal'
import AddProductForm from './AddProductForm'

const initialData = {
    product: {},
    errors: {}
}

const AddProduct = (props) => {
    const dispatch = useDispatch()
    const purchase = useSelector(state => state.document.purchase)
    const {open, setOpen} = props
    const [data, setData] = useState(initialData)


    const toggleOpen = () => setOpen(!open)

    const accept = () => {
        if(Object.keys(data.errors).length > 0 || Object.keys(data.product).length === 0 ) return
        const newPurchase = {...purchase}
        let updated = false
        let newProducts = newPurchase.products.map(element => {
            let quantity = parseFloat(element.quantity)
            if(element.id === data.product.id) {
                updated = true
                const newQuantity = quantity + parseFloat(data.product.quantity)
                return {...element, quantity: newQuantity}
            }
            return {...element, quantity}
        })
        if(!updated) {
            newProducts = [...newProducts, data.product]
        }
        newPurchase.products = newProducts
        dispatch({ type: 'document/setPurchase', payload:  newPurchase })
        setData(initialData)
        toggleOpen()
    }

    return (<Modal
            title='Agregar producto'
            open={open}
            toggleOpen={toggleOpen}
            accept={accept}
        >
            <AddProductForm data={data} setData={setData}/>
        </Modal>                                                                   )
}

export default AddProduct
