import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from '../store';
import { NavLink, withRouter } from 'react-router-dom'
import { AppBar, Typography, Grid, Button} from '@material-ui/core';


class NavBar extends Component {
  constructor() {
    super()
    this.state = {}
    this.handleClickLogout = this.handleClickLogout.bind(this)
  }

  handleClickLogout() {
    this.props.logout()
    this.props.history.push('/')
  }

  render() {
    return (
      <div>
        {this.props.user.id ?
        <Grid container alignItems="center" justify="flex-end">
        <Grid item><Typography>{this.props.user.name}</Typography></Grid><Grid item><Button onClick={this.handleClickLogout}>Logout</Button></Grid></Grid>
        :
        <Grid container alignItems="center" justify="flex-end">
        {this.props.history.location.pathname === '/' ? "" :
          <NavLink to="/">
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
