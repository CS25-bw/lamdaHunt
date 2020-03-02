import React from 'react';
import ReactDOM from 'react-dom';

// import { Router } from "react-router-dom"
import { Provider } from "react-redux"

import { createStore } from './store'
import rootReducer from './reducers'

import './index.css';
import App from './App';

const store = createStore(rootReducer)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)