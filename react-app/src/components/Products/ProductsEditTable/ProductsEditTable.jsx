import React from 'react';
import {  useDispatch, useSelector } from 'react-redux'

import { Edit, Delete } from '@material-ui/icons'
import { Paper, Checkbox, FormControlLabel, Switch, Tooltip, IconButton } from '@material-ui/core'
import { Table, TableBody, TableCell, TableContainer, TablePagination, TableRow } from '@material-ui/core'

import EnhancedTableHead from './EnhancedTableHead'
import EnhancedTableToolbar from './EnhancedTableToolbar'
import ProductModal from 'components/Products/ProductModal/ProductModal'

import { getComparator, stableSort } from 'utils/utils'
import { productTableHead } from 'store/mockups/settings.json'
import { deleteProducts } from 'store/slices/productSlice'
import { useStyles } from './style'

export default function EnhancedTable() {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('group');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const rows = useSelector(state => state.product.products)
  const dispatch = useDispatch()

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.sku);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const deleteProduct = () => {
    const ids = selected.map(item=> rows.find(s=> s.sku===item).id)
    console.log(ids)
    setPage(0)
    setSelected([])
    dispatch(deleteProducts(ids))
  }

  const editProduct = () => {
    if(!selected[0]) return
    const item = selected[0]
    const product = rows.find(s=> s.sku===item)
    dispatch({ type: 'product/setProduct', payload: product })
    dispatch({ type: 'state/toogleOpenProductForm' })
    setSelected([])
  }

  const addProduct = () => {
    dispatch({ type: 'product/setProduct', payload: {} })
    dispatch({ type: 'state/toogleOpenProductForm' })
    setSelected([])
  }

  const actions = () => 
    <>
      <Tooltip title="Eliminar">
        <IconButton aria-label="delete" onClick={deleteProduct}>
          <Delete  />
        </IconButton>
      </Tooltip>
      <Tooltip title="Editar">
        <IconButton aria-label="delete" onClick={editProduct}>
          <Edit />
        </IconButton>
      </Tooltip>
    </>


  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar 
          selected={selected} 
          addItem={addProduct}
          deleteItem={deleteProduct}
          editItem={editProduct}
        />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
            stickyHeader={true}
          >
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              headCells={productTableHead}
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              actions
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.sku);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.sku)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.sku}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="checkbox">
                        {row.description}
                      </TableCell>
                      <TableCell padding="none">{row.departament}</TableCell>
                      <TableCell size="small" align="right">{row.stock}</TableCell>
                      <TableCell size="small" align="right">{row.tax * 100}%</TableCell>
                      <TableCell size="small" align="right">{row.price}</TableCell>
                      <TableCell size="small" align="right">{row.price_2}</TableCell>
                      <TableCell size="small" align="right">{row.price_3}</TableCell>
                      <TableCell className={classes.actions}>{isItemSelected ? actions() : <div />}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Tabla condensada"
      />
      <ProductModal />
    </div>
  );
}
