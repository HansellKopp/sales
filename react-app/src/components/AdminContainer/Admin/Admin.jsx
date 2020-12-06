import { Switch, BrowserRouter, Route } from "react-router-dom"
import PrivateRoute from 'components/privateRoute/PrivateRoute'


<BrowserRouter>
    <Switch>
        <Route 
            exact path={window.$routePrefix + "/"}
            render={() => ((session && session.isLogged) ? <Home />: <Login />) }
        />
        <Route exact path={window.$routePrefix + "/registration/:token/"}>
            <RegistrationStatus />
        </Route>
        <Route 
            exact path={window.$routePrefix + "/login/"}                    
            render={() => ((session && session.isLogged) ? <Home />: <Login />) }
        />
        <Route
            path={window.$routePrefix + "/logout/"}
            component={redirectToLogout}
        />
        <Route
                        path={window.$routePrefix + "/news/"}
                        component={redirectToNews}
                    />
                    <Route exact path={window.$routePrefix + "/registration-success/"}>
                      <RegistrationSuccess />
                    </Route>
                    <PrivateRoute exact path={window.$routePrefix + "/meetings/"}>
                      <Meetings />
                    </PrivateRoute>

                    <Route render={() => (<Page404 />)} />
                  </Switch>
      </BrowserRouter>