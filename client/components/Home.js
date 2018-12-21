import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { getChapterVerses } from '../store'

class Home extends Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount () {
  }

  render() {
    return (
      <NavLink to='/luke'>Luke</NavLink>
    )
  }
}

// const mapStateToProps = (state) => {}

// const mapDispatchToProps = (dispatch) => {}

export default Home;
