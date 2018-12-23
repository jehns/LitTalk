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
        <Route path="/"><NavBar /></Route>

        <Switch>
          <Route exact path='/' component={Login}/>
          <Route exact path='/home' component={Home}/>
          <Route exact path='/:book' component={Chapter}/>
        </Switch>
      </div>
    )
  }
}

// const mapStateToProps = (state) => ()

const mapDispatchToProps = (dispatch) => ({
  fetchUser: () => dispatch(fetchUser())
})

export default withRouter(connect(null, mapDispatchToProps)(Main));
