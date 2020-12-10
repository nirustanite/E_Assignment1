import React from 'react';
import ReactDOM from "react-dom";
import Pages from './pages/Pages';
import 'regenerator-runtime/runtime';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import store from "./redux/store";
import './index.css';

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Pages />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);