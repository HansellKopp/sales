import React from 'react'
import { useSelector } from 'react-redux'

import {formatNumber, formatInvoiceNumber, formatDate, totalize } from 'utils/utils'
import { useStyles } from './style'

const InvoiceHeader = () => {
  const classes = useStyles();
  const { parameters } = useSelector(state => state.state)
  const { invoice } = useSelector(state => state.document)
  const totalInvoice = totalize(invoice.details, 'price') * parameters.exchange
  if(totalInvoice===0)  return null 
  return (
    <div>
    <div className={classes.header}>
      <div>
        <h2>{parameters.name}</h2>
        <h3>{parameters.tax_id}</h3>
        <div>{parameters.address}</div>
      </div>
      <div className='column-right'>
        <h3>Nota de entrega: <span className='bold'>{formatInvoiceNumber(invoice.number)}</span></h3>
        <h3>Fecha de emision: {formatDate(new Date(invoice.date))}</h3>
      </div>
  </div>
  <div className={classes.header}>
  <div>
    <h3>RIF :{invoice.person.tax_id}</h3>
    <h3>Nombre / Razon social: {invoice.person.firstname} {invoice.person.lastname}</h3>
    <h3>Direccion: {invoice.person.address} {invoice.person.city}</h3>
    <h3><span>Telefono: {invoice.person.phone}</span> <span>Email: {invoice.person.email}</span></h3>
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
      {invoice.details.map((product, key) => 
        <tr key={key}>
            <td className='left'>{product.description}</td>
            <td>{product.quantity}</td>
            <td>{'Kg.'}</td>
            <td>{
              formatNumber(product.price * parameters.exchange)
            }</td>
            <td>{
              formatNumber(product.price * parameters.exchange)
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
