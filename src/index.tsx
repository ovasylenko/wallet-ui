import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { worker }  from "./mocks/browser";

import App from './App';
import reportWebVitals from './reportWebVitals';
import store from "./data";

import "./index.css";
worker.start();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider >
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
