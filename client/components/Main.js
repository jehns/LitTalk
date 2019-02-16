import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../store';
import {HashRouter, Switch, Route, withRouter} from 'react-router-dom';
import Home from './Home';
import Chapter from './Chapter';
import Login from './Login';
import NavBar from './NavBar';
import UserProfile from './UserProfile';
import SideMenu from './SideMenu';
import Footer from './Footer'




class Main extends Component {
  constructor() {
    super()
    this.state = {
      sideMenuOpen: false
    }
    this.handleMenuClick = this.handleMenuClick.bind(this)
  }

  componentDidMount() {
    this.props.fetchUser()
  }

  handleMenuClick() {
    this.setState((prevState) => {
      return {sideMenuOpen: !prevState.sideMenuOpen}
    })
  }

  render() {
    return (
      <div>
        <NavBar handleMenuClick={this.handleMenuClick}/>

        {/* <SideMenu menuOpen={this.state.sideMenuOpen}/> */}



        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/profile' component={UserProfile}/>
          <Route exact path='/:book/:chapter' component={Chapter}/>
          <Route exact path='/:book/:chapter/:verse' component={Chapter}/>
        </Switch>

        {/* <Footer /> */}
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
