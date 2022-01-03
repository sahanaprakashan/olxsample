import React from 'react';
import ReactDOM from 'react-dom';
import {AppContext} from './store/Context'
import App from './App';
import {Firebase} from './firebase/configure'

ReactDOM.render(
  <AppContext.Provider value={{Firebase}} >
    <App />
  </AppContext.Provider>
    ,document.getElementById('root')
);

