import React from 'react'
import { useSelector } from 'react-redux'

import { useStyles } from './style'

const invoiceData = {
  number: '00001',
  data: '31/12/2020',
  client: {
    tax_id: 'J310037221',
    firstname: 'HK sistemas, c.a.',
    lastname: '',
    address: 'Küstriner Str. 6A',
    city: 'Berlin - 13055',
    phone: '0281-2866220',
    email: 'dummy_info@gmail.com'
  },
}

const InvoiceHeader = () => {
  const classes = useStyles();
  const {parameters} = useSelector(state => state.state)
  const products = useSelector(state => state.cart.products)
  
  return (
    <div>
    <div className={classes.header}>
      <div>
        <h2>{parameters.name}</h2>
        <h3>{parameters.tax_id}</h3>
        <div>{parameters.address}</div>
      </div>
      <div>
        <h3>Nota de entrega: <span className='bold'>{invoiceData.number}</span></h3>
        <h3>Fecha de emision: {invoiceData.data}</h3>
      </div>
      <hr></hr>
  </div>
  <div className={classes.header}>
  <div>
    <h3>RIF :{invoiceData.client.tax_id}</h3>
    <h3>Nombre / Razon social: {invoiceData.client.firstname} {invoiceData.client.lastname}</h3>
    <h3>Direccion: {invoiceData.client.address} {invoiceData.client.city}</h3>
    <h3><span>Telefono: {invoiceData.client.phone}</span> <span>Email: {invoiceData.client.email}</span></h3>
  </div>
  </div>
  <hr></hr>
  <table className={classes.table}>
    <thead>
    <tr>
      <th>Descripcion</th>
      <th>Cantidad</th>
      <th>Unidad</th>
      <th>Precio Unitario</th>
      <th>Neto</th>
    </tr>
    </thead>
    <tfoot>
      <tr>
        <td>Totales</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    </tfoot>
    <tbody>
      {products.map((product, key) => 
        <tr key={key}>
            <td>{product.description}</td>
            <td>{product.quantity}</td>
            <td>{'Kg.'}</td>
            <td>{product.price}</td>
            <td>{product.quantity * product.price}</td>
        </tr>
      )}
    </tbody>
    </table>
</div>


  )

}

export default class Invoice extends React.PureComponent {
    render() {
      return <div><InvoiceHeader /></div>
    }
}
