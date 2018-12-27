import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../store';
import {HashRouter, Switch, Route, withRouter} from 'react-router-dom'
import Home from './Home'
import Chapter from './Chapter'
import Login from './Login';
import NavBar from './NavBar';


class Main extends Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    this.props.fetchUser()
  }

  render() {
    return (
      <div>
        <NavBar />

        <Switch>
          <Route exact path='/' component={Login}/>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/home' component={Home}/>
          <Route exact path='/:book/:chapter' component={Chapter}/>
          <Route exact path='/:book/:chapter/:verse' component={Chapter}/>
        </Switch>
      </div>
    )
  }
}

// const mapStateToProps = (state) => ({
//   user: state.user
// })

const mapDispatchToProps = (dispatch) => ({
  fetchUser: () => dispatch(fetchUser())
})

export default withRouter(connect(null, mapDispatchToProps)(Main));
