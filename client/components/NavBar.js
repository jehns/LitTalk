import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from '../store';
import { NavLink, withRouter } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Grid, Button, Avatar, IconButton, Drawer, Divider, List, ListItem} from '@material-ui/core';
import { Home, Menu, ArrowForward, ArrowBack, ChevronLeft } from '@material-ui/icons';


class NavBar extends Component {
  constructor() {
    super()
    this.state = {
      open: false
    }
    this.handleClickLogout = this.handleClickLogout.bind(this)
    this.handleClickUser = this.handleClickUser.bind(this)
    this.handleHomeClick = this.handleHomeClick.bind(this)
    this.handleMenuOpen = this.handleMenuOpen.bind(this)
    this.handleMenuClosed = this.handleMenuClosed.bind(this)


  }

  handleClickLogout() {
    this.props.logout()
    this.props.history.push('/login')
  }
  handleClickUser() {
    this.props.history.push('/profile')
  }

  handleHomeClick() {
    this.props.history.push('/')
  }

  handleMenuOpen() {
    this.setState({
      open: true
    })
  }

  handleMenuClosed() {
    this.setState({
      open: false
    })
  }

  render() {
    return (
      <AppBar position="sticky">
      <Toolbar>
      <Grid container alignItems="center" justify="flex-start">
          <Grid item>
            <IconButton color="secondary" onClick={this.handleMenuOpen}>
              <Menu />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton color="secondary" onClick={this.handleHomeClick}>
              <Home />
            </IconButton>
          </Grid>
      </Grid>

      <Drawer
          variant="persistent"
          anchor="left"
          open={this.state.open}
        >
          <div>
            <IconButton onClick={this.handleMenuClosed}>
              <ChevronLeft />
            </IconButton>
          </div>
          <Divider />
          <List>
            <ListItem button color='primary'>Book</ListItem>
            <ListItem>Chapter</ListItem>
            <ListItem>Verse</ListItem>
          </List>
          <Divider />
          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem button key={text}>

              </ListItem>
            ))}
          </List>
        </Drawer>

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
            <Button color="secondary" style={{textDecoration: "none"}}>Log In</Button>
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
