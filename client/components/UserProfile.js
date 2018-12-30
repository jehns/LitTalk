import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink, Redirect } from 'react-router-dom';
import { getChapterVerses } from '../store'
import { Typography } from '@material-ui/core';


class UserProfile extends Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <div>
        {this.props.user.id ? <Typography variant="h3">{this.props.user.name}</Typography>: ""}
        <br />
        <img src={this.props.user.imageUrl} />
        <br />
        <Typography variant="h4">Biography</Typography>
        <Typography>{this.props.user.biography}</Typography>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user
})

// const mapDispatchToProps = (dispatch) => {}

export default connect(mapStateToProps, null)(UserProfile);
