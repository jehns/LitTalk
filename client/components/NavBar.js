import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from '../store';
import { NavLink, withRouter } from 'react-router-dom'
import { AppBar, Typography, Grid, Button, Avatar} from '@material-ui/core';


class NavBar extends Component {
  constructor() {
    super()
    this.state = {}
    this.handleClickLogout = this.handleClickLogout.bind(this)
    this.handleClickUser = this.handleClickUser.bind(this)
  }

  handleClickLogout() {
    this.props.logout()
    this.props.history.push('/login')
  }
  handleClickUser() {
    this.props.history.push('/profile')
  }

  render() {
    return (
      <div>
        {this.props.user && this.props.user.id ?
        <Grid container alignItems="center" justify="flex-end">
          <Grid item>
            <Avatar src={`${this.props.user.imageUrl}`}/>
          </Grid>
          <Grid item>
          <Button onClick={this.handleClickUser}>{this.props.user.name}</Button>
          </Grid>
          <Grid item>
          <Button onClick={this.handleClickLogout}>Logout</Button>
          </Grid>
        </Grid>
        :
        <Grid container alignItems="center" justify="flex-end">
        {this.props.history.location.pathname === '/login' ? "" :
          <NavLink to="/login">
            <Button>Log In</Button>
          </NavLink>}
        </Grid>}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user
})

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));
