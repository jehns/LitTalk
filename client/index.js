import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {HashRouter, Switch, Route} from 'react-router-dom'
import store from './store'
import Main from './components/Main'

// material ui
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import {indigo, blue, pink, red} from '@material-ui/core/colors';


// All the following keys are optional.
// We try our best to provide a great default value.
const theme = createMuiTheme({
  palette: {
    primary: {
      50: "#e3f2fd",
      100: "#bbdefb",
      200: "#90caf9",
      300: "#64b5f6",
      400: "#42a5f5",
      500: "#2196f3",
      600: "#1e88e5",
      700: "#1976d2",
      800: "#1565c0",
      900: "#0d47a1",
      A100: "#82b1ff",
      A200: "#448aff",
      A400: "#2979ff",
      A700: "#2962ff",
      contrastDefaultColor: "light"
    },
    secondary: red,
  },
  typography: {
    useNextVariants: true
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
