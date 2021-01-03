import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Paper } from '@material-ui/core'
import { DeleteForever } from '@material-ui/icons'
import { Table, TableBody, TableCell, TableContainer, TableRow } from '@material-ui/core'
import { Tooltip, IconButton } from '@material-ui/core'

import EnhancedTableHead from 'components/EnhancedTableHead/EnhancedTableHead'

import PurchaseToolbar from './PurchaseToolbar'
import { formatNumber, totalizeCols } from 'utils/utils'
import { purchaseProductsHead } from 'store/mockups/settings.json'

import { useStyles } from './style'

const PurchaseTable = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const purchase = useSelector(state => state.document.purchase)
  const { exchange } = useSelector(state => state.state.parameters)
  const { products } = purchase

  const totalPurchase = totalizeCols(products, ['cost', 'quantity'])

  const removeProduct = (id) => {
    const newProducts = products.filter(item=> item.id!==id)
    const newPurchase = {...purchase}
    newPurchase.products = [...newProducts]
    dispatch({ type: 'document/setPurchase', payload:  newPurchase })
  }
  
  return (
    <Paper elevation={3} >
      <TableContainer className={classes.container}>
      <PurchaseToolbar />
      <Table
        className={classes.table}
        aria-labelledby="tableTitle"
        size={'medium'}
        aria-label="enhanced table"
        stickyHeader={true}
      >
        <EnhancedTableHead
          className={classes}
          headCells={purchaseProductsHead}
          numSelected={0}
          rowCount={products.length}
          actions
          useCheck={false}
          />
        <TableBody>
          {products.map((row) => {
              const total = row.cost * row.quantity
              const totalbs = total * exchange
              return (
                  <TableRow key={row.id}>
                  <TableCell size="medium">{row.description}</TableCell>
                  <TableCell size="medium">{formatNumber(row.quantity)}</TableCell>
                  <TableCell size="medium">{formatNumber(row.cost)}</TableCell>
                  <TableCell size="medium">{formatNumber(row.price)}</TableCell>
                  <TableCell size="small" align="right">{formatNumber(total)}</TableCell>
                  <TableCell size="small" align="right">{formatNumber(totalbs)}</TableCell>
                  <TableCell size="small">
                  <Tooltip title="Agregar Producto">
                    <IconButton aria-label="Eliminar producto" onClick={(e) => removeProduct(row.id)} className={classes.highlight}>
                      <DeleteForever />
                    </IconButton>
                  </Tooltip>
                  </TableCell>
                </TableRow>
              );
          })}
          <TableRow>
            <TableCell colSpan={4} align="right">Totales</TableCell>
            <TableCell size="small" align="right">{formatNumber(totalPurchase)}</TableCell>
            <TableCell size="small" align="right">{formatNumber(totalPurchase * exchange)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      </TableContainer>
    </Paper>
  )
}

export default PurchaseTable