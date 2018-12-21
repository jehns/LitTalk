import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {HashRouter, Switch, Route} from 'react-router-dom'
import store from './store'
import Home from './components/Home'
import Chapter from './components/Chapter'

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/:book' component={Chapter}/>
      </Switch>
    </HashRouter>
  </Provider>,
  document.getElementById('app')
);
