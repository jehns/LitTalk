import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {HashRouter, Switch, Route} from 'react-router-dom'
import store from './store'
import Main from './components/Main'

// material ui
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
import pink from '@material-ui/core/colors/pink';
import red from '@material-ui/core/colors/red';

// All the following keys are optional.
// We try our best to provide a great default value.
const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },

  },
  typography: {
    useNextVariants: true,
  },
});


ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <HashRouter>
        <Main />
      </HashRouter>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('app')
);
