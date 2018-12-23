import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {HashRouter, Switch, Route} from 'react-router-dom'
import store from './store'
import Home from './components/Home'
import Chapter from './components/Chapter'
import Login from './components/Login'


ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <Switch>
        <Route exact path='/' component={Login}/>
        <Route exact path='/:book' component={Chapter}/>
        <Route path='/home' component={Home}/>
      </Switch>
    </HashRouter>
  </Provider>,
  document.getElementById('app')
);
