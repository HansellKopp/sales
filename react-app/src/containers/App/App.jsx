import React from 'react'
import { useSelector } from 'react-redux'
import { Switch, BrowserRouter, Route } from "react-router-dom"

import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';


import Bar from './Bar/Bar'
import Home from 'components/Home'
import Login from 'components/Login/Login'
import LeftDrawer from './LeftDrawer/LeftDrawer'

import Settings from 'components/Settings/Settings'
import PrivateRoute from 'components/PrivateRoute/PrivateRoute'
import ReportSummary from 'components/ReportSummary/ReportSummary'
import InvoicesTable from 'components/Invoice/Invoices/InvoicesTable'
import PurchaseForm from 'components/Purchase/PurchaseForm/PurchaseForm'
import PurchasesTable from 'components/Purchases/PurchasesTable'
import ProductsEditTable from 'components/Products/ProductsEditTable/ProductsEditTable'

import useStyles from './styles'
import Messages from 'components/Messages';
import SettingsExchenge from 'components/Settings/SettingsExchange';

export default function Dashboard() {
  const classes = useStyles();
  const { loading, showExchange } = useSelector(state => state.state)
  const { user } = useSelector(state => state.auth)
  if (loading!=='idle') return ( null )
  return (
    <BrowserRouter>
    <div className={classes.root}>
      <CssBaseline />
      <Messages />
      <Bar />
      <LeftDrawer />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
            {showExchange ? <SettingsExchenge /> :
              <Switch>
                <Route 
                  exact path={"/"}
                  render={() => <Home /> }
                />
                <Route 
                  exact path={"/login/"}                    
                  render={() => ((user && user.active) ? <Home />: <Login />) }
                />
                <Route
                  exact path={"/summary/"}
                ><ReportSummary /></Route>
                <PrivateRoute
                  exact path={"/products/"}
                ><ProductsEditTable /></PrivateRoute>
                <PrivateRoute
                  exact path={"/invoices/"}
                ><InvoicesTable /></PrivateRoute>
                <PrivateRoute
                  exact path={"/parameters/"}
                ><Settings /></PrivateRoute>
                <PrivateRoute
                  exact path={"/purchases/"}
                ><PurchasesTable /></PrivateRoute>
                <PrivateRoute
                  exact path={"/purchases/new/"}
                ><PurchaseForm /></PrivateRoute>
                <PrivateRoute
                  exact path={"/purchases/edit/:id"}
                ><PurchaseForm /></PrivateRoute>
              </Switch>}
        </Container>
      </main>
    </div>
    </BrowserRouter>
  );
}
