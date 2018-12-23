import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../store';


class Login extends Component {
  constructor() {
    super()
    this.state = {}
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount () {
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.getUser({
      email: e.target.email.value,
      password: e.target.password.value
    })
    this.props.history.push('/home')
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="email">Email</label>
        <input name="email" type="text"/>
        <label htmlFor="password">Password</label>
        <input name="password" type="text"/>
        <input type="submit"/>
      </form>
    )
  }
}

const mapStateToProps = (state) => {}

const mapDispatchToProps = (dispatch) => ({
  getUser: (user) => dispatch(getUser(user))
})

export default connect(null, mapDispatchToProps)(Login);
