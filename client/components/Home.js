import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
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
        {this.props.user.id ? <h2>Welcome {this.props.user.name}!</h2>: ""}
        <NavLink to='/luke'><Typography variant="h3">Luke</Typography></NavLink>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user
})

// const mapDispatchToProps = (dispatch) => {}

export default connect(mapStateToProps, null)(Home);
