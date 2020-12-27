import React, { useEffect, useRef } from 'react';
import {  useDispatch, useSelector } from 'react-redux'
import { FilterList } from '@material-ui/icons'
import { Paper, Typography } from '@material-ui/core'
import { Table, TableBody, TableCell, TableContainer, TableRow, TableHead } from '@material-ui/core'

import { useReactToPrint } from 'react-to-print';

import SelectDate from 'components/SelectDate/SelectDate'
import EnhancedTableHead from './EnhancedTableHead'
import EnhancedTableToolbar from './EnhancedTableToolbar'

import { getSummary } from 'store/slices/reportSlice'
import { formatNumber, formatDate, today, totalize } from 'utils/utils'
import { summaryTableHead } from 'store/mockups/settings.json'
import { useStyles } from './style'

export default function EnhancedTable() {
  const classes = useStyles()
  const componentRef = useRef()
  const dispatch = useDispatch()
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState(today())
  const summary = useSelector(state => state.report.summary)

  useEffect(() => {
    dispatch(getSummary({ date }))
    // eslint-disable-next-line 
  },[date])

  const doPrint = useReactToPrint({
      content: () => componentRef.current,
  });
  
  const selectDate = (date) => setDate(date)

  const { invoices, payments, products} = summary
  const formatedDate = formatDate(new Date(date), { dateStyle: 'full' })

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar print={doPrint} selectDate={selectDate} date={date}/>
        <TableContainer className={classes.container} ref={componentRef}>
          {(invoices && invoices.length > 0) ?
          <Table
            size={'small'}
            stickyHeader={true}
            className={classes.table}
            aria-label="enhanced table"
            aria-labelledby="tableTitle"
          >
            <EnhancedTableHead headCells={summaryTableHead.invoices} title={`Facturas ${formatedDate}`}/>
            <TableBody>
              {(invoices || []).map((row) => 
                    <TableRow key={row.number} >
                      <TableCell size="small" align="right" padding="checkbox">{row.number}</TableCell>
                      <TableCell size="small">{row.tax_id}</TableCell>
                      <TableCell size="medium">{row.fullname}</TableCell>
                      <TableCell size="small" align="right">{formatNumber(row.total)}</TableCell>
                      <TableCell size="small" align="right">{formatNumber(row.total_bs)}</TableCell>
                    </TableRow>
                )}
              <TableRow>
                <TableCell colSpan={3} align="right">Totales</TableCell>
                <TableCell size="small" align="right">{formatNumber(totalize(invoices,'total'))}</TableCell>
                <TableCell size="small" align="right">{formatNumber(totalize(invoices,'total_bs'))}</TableCell>
              </TableRow>
            </TableBody>
            <EnhancedTableHead headCells={summaryTableHead.payments} title={'Totales por forma de pago'}/>
            <TableBody>
              {(payments || []).map((row) => 
                    <TableRow key={row.payment_type} >
                      <TableCell colSpan={3}>{row.payment_type}</TableCell>
                      <TableCell size="small" align="right">{formatNumber(row.total)}</TableCell>
                      <TableCell size="small" align="right">{formatNumber(row.total_bs)}</TableCell>
                    </TableRow>
                )}
              <TableRow>
                <TableCell align="right" colSpan={3}>Totales</TableCell>
                <TableCell size="small" align="right">{formatNumber(totalize(payments,'total'))}</TableCell>
                <TableCell size="small" align="right">{formatNumber(totalize(payments,'total_bs'))}</TableCell>
              </TableRow>
            </TableBody>
            <EnhancedTableHead headCells={summaryTableHead.products} title={'Ventas por producto'}/>
            <TableBody>
              {(products || []).map((row) => 
                    <TableRow key={row.description} >
                      <TableCell size="medium" colSpan={4} >{row.description}</TableCell>
                      <TableCell size="small" align="right">{formatNumber(row.quantity)}</TableCell>
                    </TableRow>
                )}
            </TableBody>
          </Table> :
          <Table>
             <TableHead >
                <TableRow>
                  <TableCell component="th" colSpan={5}>
                    <Typography variant="h5" style={{textAlign: 'center'}}>
                      No se consiguen datos, para el dia {formatedDate}
                    </Typography>
                  </TableCell>
              </TableRow>
              <TableRow>
                  <TableCell component="th" colSpan={5}>
                  <Typography variant="h5" style={{textAlign: 'center'}}>
                    Favor elegir otra fecha aqui <FilterList onClick={() => setOpen(!open)} style={{cursor: 'pointer'}}/>
                  </Typography>
                  </TableCell>
              </TableRow>
            </TableHead>
          </Table>
          }
        </TableContainer>
        <SelectDate    
          open={open}
          date={date}
          toogleOpen={() => setOpen(!open)}
          title="Por favor seleccione la fecha"
          onConfirm={selectDate}
        />
      </Paper>
    </div>
  );
}
