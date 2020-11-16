import React from 'react'
import { useSelector } from 'react-redux'

import {formatNumber, totalize } from 'utils/utils'
import { useStyles } from './style'

const InvoiceHeader = () => {
  const classes = useStyles();
  const { parameters } = useSelector(state => state.state)
  const { products } = useSelector(state => state.cart.products)
  const { person, header } = useSelector(state => state.document.data)
  const { number, date, exchange_rate } = header
  const totalInvoice = totalize(products, 'price') * exchange_rate
  return (
    <div>
    <div className={classes.header}>
      <div>
        <h2>{parameters.name}</h2>
        <h3>{parameters.tax_id}</h3>
        <div>{parameters.address}</div>
      </div>
      <div className='column-right'>
        <h3>Nota de entrega: <span className='bold'>{number}</span></h3>
        <h3>Fecha de emision: {date}</h3>
      </div>
  </div>
  <div className={classes.header}>
  <div>
    <h3>RIF :{person.tax_id}</h3>
    <h3>Nombre / Razon social: {person.firstname} {person.lastname}</h3>
    <h3>Direccion: {person.address} {person.city}</h3>
    <h3><span>Telefono: {person.phone}</span> <span>Email: {person.email}</span></h3>
  </div>
  </div>
  <hr></hr>
  <table className={classes.table}>
    <thead>
    <tr>
      <th className='left'>Descripcion</th>
      <th>Cantidad</th>
      <th>Unidad</th>
      <th>Precio Unitario</th>
      <th>Neto</th>
    </tr>
    </thead>
    <tfoot className='footer'>
      <tr>
        <td className='left'>Totales</td>
        <td></td>
        <td></td>
        <td></td>
        <td>{formatNumber(totalInvoice)}</td>
      </tr>
    </tfoot>
    <tbody>
      {products.map((product, key) => 
        <tr key={key}>
            <td className='left'>{product.description}</td>
            <td>{product.quantity}</td>
            <td>{'Kg.'}</td>
            <td>{
              formatNumber(product.price * exchange_rate)
            }</td>
            <td>{
              formatNumber(product.price * exchange_rate)
            }</td>
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
