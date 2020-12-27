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
import ProductsEditTable from 'components/Products/ProductsEditTable/ProductsEditTable'

import useStyles from './styles'
import Messages from 'components/Messages';

export default function Dashboard() {
  const classes = useStyles();
  const { loading } = useSelector(state => state.state)
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
              <Switch>
                <Route 
                  exact path={"/"}
                  render={() => <Home /> }
                />
                <Route 
                  exact path={"/login/"}                    
                  render={() => ((user && user.active) ? <Home />: <Login />) }
                />
                <PrivateRoute
                  exact path={"/products/"}
                ><ProductsEditTable /></PrivateRoute>
                <PrivateRoute
                  exact path={"/invoices/"}
                ><InvoicesTable /></PrivateRoute>
                <PrivateRoute
                  exact path={"/summary/"}
                ><ReportSummary /></PrivateRoute>
                <PrivateRoute
                  exact path={"/parameters/"}
                ><Settings /></PrivateRoute>
              </Switch>
        </Container>
      </main>
    </div>
    </BrowserRouter>
  );
}
