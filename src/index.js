import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import "./styles/style.scss";

ReactDOM.render(<MuiThemeProvider><App /></MuiThemeProvider>, document.getElementById('root'));
