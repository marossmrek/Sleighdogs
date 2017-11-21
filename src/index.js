import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";

import store from "./store";
import App from './containers/App';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import "./styles/style.scss";

ReactDOM.render(<MuiThemeProvider><Provider store={store}><App /></Provider></MuiThemeProvider>,document.getElementById('root'));

