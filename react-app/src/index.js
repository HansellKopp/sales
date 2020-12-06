import React from 'react';
import ReactDOM from 'react-dom';
import './assets/main.css'
import App from 'containers/App/App';
// import registerServiceWorker from './registerServiceWorker'
import store from 'store/store'
import { Provider } from 'react-redux';
import { getData } from 'store/slices/stateSlice'

if(document.getElementById('root')) {
  store.dispatch(getData())
  ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
          <App />
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')
  );
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

// registerServiceWorker()
