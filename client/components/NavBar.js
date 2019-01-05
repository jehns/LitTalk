import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from '../store';
import { NavLink, withRouter } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Grid, Button, Avatar, IconButton} from '@material-ui/core';
import { Home, Menu, ArrowForward, ArrowBack } from '@material-ui/icons';


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
      <AppBar position="sticky">
      <Toolbar>
      <Grid container alignItems="center" justify="flex-start">
          <Grid item>
            <IconButton color="secondary">
              <Menu />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton color="secondary">
              <Home />
            </IconButton>
          </Grid>
      </Grid>

        {this.props.user && this.props.user.id ?
        <Grid container alignItems="center" justify="flex-end">
          <Grid item>
            <Avatar src={`${this.props.user.imageUrl}`}/>
          </Grid>
          <Grid item>
          <Button onClick={this.handleClickUser} color="secondary">{this.props.user.name}</Button>
          </Grid>
          <Grid item>
          <Button onClick={this.handleClickLogout} color="secondary">Logout</Button>
          </Grid>
        </Grid>
        :
        <Grid container alignItems="center" justify="flex-end">
        {this.props.history.location.pathname === '/login' ? "" :
          <NavLink to="/login">
            <Button>Log In</Button>
          </NavLink>}
        </Grid>}
        </Toolbar>
      </AppBar>
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
