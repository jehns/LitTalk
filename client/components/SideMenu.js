import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from '../store';
import { NavLink, withRouter } from 'react-router-dom'
import { Menu, MenuItem, Typography} from '@material-ui/core';
import {  } from '@material-ui/icons';


const SideMenu = (props) => {

  return (
    <Menu open={props.menuOpen || false}>
      <MenuItem><Typography>Book</Typography></MenuItem>
      <MenuItem><Typography>Chapter</Typography></MenuItem>
      <MenuItem><Typography>Verse</Typography></MenuItem>
    </Menu>
  )
}

// const mapStateToProps = (state) => ({
// })

// const mapDispatchToProps = (dispatch) => ({
// })

export default withRouter(connect(null, null)(SideMenu));
