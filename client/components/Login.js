import React, { Component } from 'react';
import { connect } from 'react-redux';

class Login extends Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount () {
  }

  render() {
    return (
      <form>
        <label htmlFor="email">Email</label>
        <input name="emial" type="text"/>
        <label htmlFor="password">Password</label>
        <input name="password" type="text"/>
        <input type="submit"/>
      </form>
    )
  }
}

const mapStateToProps = (state) => {}

const mapDispatchToProps = (dispatch) => {}

export default connect(null, null)(Login);
