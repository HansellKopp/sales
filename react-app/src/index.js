import React from 'react';
import ReactDOM from 'react-dom';
import './assets/main.css'
import App from 'containers/App/App';
// import registerServiceWorker from './registerServiceWorker'
import store from 'store/store'
import { Provider } from 'react-redux';
import { getData } from 'store/slices/stateSlice'
import { getProducts } from 'store/slices/productSlice'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { esES } from '@material-ui/core/locale';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#1976d2' },
  },
}, esES);

if(document.getElementById('root')) {
  store.dispatch(getData())
  store.dispatch(getProducts())
  ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')
  );
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

// registerServiceWorker()
