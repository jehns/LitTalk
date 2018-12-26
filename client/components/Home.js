import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink, Redirect } from 'react-router-dom';
import { getChapterVerses } from '../store'
import { Typography } from '@material-ui/core';


class Home extends Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <div>
        {this.props.user.id ? <Typography variant="h3">Welcome, {this.props.user.name}!</Typography>: ""}
        <br />
        <br />
        <Typography variant="h4" style={{textDecoration: 'underline'}}>Books</Typography>
        <NavLink to='/luke' style={{textDecoration: 'none'}}>
        <br />
        <Typography variant="h5">Luke</Typography></NavLink>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user
})

// const mapDispatchToProps = (dispatch) => {}

export default connect(mapStateToProps, null)(Home);
