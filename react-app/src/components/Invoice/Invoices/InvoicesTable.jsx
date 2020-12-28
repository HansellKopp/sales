import React, { useEffect, useRef } from 'react';
import {  useDispatch, useSelector } from 'react-redux'
import { Paper, Checkbox, FormControlLabel, Switch } from '@material-ui/core'
import { Table, TableBody, TableCell, TableContainer, TablePagination, TableRow } from '@material-ui/core'
import { useReactToPrint } from 'react-to-print';

import EnhancedTableHead from './EnhancedTableHead'
import EnhancedTableToolbar from './EnhancedTableToolbar'
import Invoice from 'components/Invoice/Invoice'

import { getInvoicesDates, getInvoice } from 'store/slices/documentSlice'
import { getComparator, stableSort, formatNumber, formatDate, today } from 'utils/utils'
import { invoiceTableHead } from 'store/mockups/settings.json'
import { useStyles } from './style'

export default function EnhancedTable() {
  const classes = useStyles();
  const componentRef = useRef();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('group');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const rows = useSelector(state => state.document.invoices)
  const { readyToPrint } = useSelector(state => state.document.invoice)
  const [range, setRange] = React.useState({from: today(), to: today()});
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getInvoicesDates({ from: range.from, to: range.to }))
    // eslint-disable-next-line 
  },[range])

  useEffect(() => {
    if(readyToPrint) {
      doPrint()
      toggleOpen()
      dispatch({ type: 'document/clearInvoice' })
    }
    // eslint-disable-next-line 
  }, [readyToPrint])
  
  const toggleOpen  = () => dispatch({ type: 'state/toogleShowInvoiceForm' })

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    if (selectedIndex === -1) {
      setSelected([id])
    }
    else {
      setSelected([])
    }  
  }

  const doPrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleChangePage = (event, newPage) =>  setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => setDense(event.target.checked)

  const printItem = () => {
    if(!selected[0]) return
    const item = selected[0]
    const invoice = rows.find(s=> s.number===item)
    dispatch(getInvoice(invoice.id))
    setSelected([])
  }

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const selectRange = (e) => setRange (e)

  if(!rows) return null

  const totalInvoices = rows.reduce((acc, row)=> (acc+row.total), 0)
  const totalInvoicesBs = rows.reduce((acc, row)=> (acc+(row.total*row.exchange)), 0)

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar 
          selected={selected} 
          printItem={printItem}
          range={range}
          selectRange={selectRange}
        />
        <TableContainer className={classes.container}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
            stickyHeader={true}
          >
            <EnhancedTableHead
              className={classes}
              order={order}
              orderBy={orderBy}
              headCells={invoiceTableHead}
              numSelected={selected.length}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              actions
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  const totalbs = row.exchange * row.total
                  const taxId = !row.person ? '' : `${row.person['tax_id']}`
                  const fullname = !row.person ? '' : `${row.person.firstname} ${row.person.lastname}`
                  const date = Date.parse(row.date)
                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="checkbox" align="center" >
                        {row.number}
                      </TableCell>
                      <TableCell padding="none">{formatDate(date)}</TableCell>
                      <TableCell size="medium">{taxId}</TableCell>
                      <TableCell size="medium">{fullname}</TableCell>
                      <TableCell size="small" align="right">{formatNumber(row.total)}</TableCell>
                      <TableCell size="small" align="right">{formatNumber(totalbs)}</TableCell>
                    </TableRow>
                  );
                })}
              <TableRow>
                <TableCell colSpan={5} align="right">Totales</TableCell>
                <TableCell align="right">{formatNumber(totalInvoices)}</TableCell>
                <TableCell align="right">{formatNumber(totalInvoicesBs)}</TableCell>
              </TableRow>
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          page={page}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          onChangePage={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />

      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Tabla condensada"
      />
      <div style={{ display: "none" }}><Invoice  ref={componentRef} /></div>
    </div>
  );
}
