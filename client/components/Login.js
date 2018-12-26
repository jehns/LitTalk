import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../store';
import { InputLabel, Input, FormGroup, Button, Typography } from '@material-ui/core';



class Login extends Component {
  constructor() {
    super()
    this.state = {
      userFound: false,
      email: 'ddd',
      password: 'eeee'
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount () {
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.getUser({
      email: this.state.email,
      password: this.state.password
    })
    this.props.history.push('/home')
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <div>
      <Typography variant="h2">Login</Typography>
      <br />
        <FormGroup>
          <InputLabel htmlFor="email">Email</InputLabel>
          <Input name="email" type="text" onChange={this.handleChange} value={this.state.emailInput}/>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input name="password" type="text" onChange={this.handleChange} value={this.state.passwordInput}/>
          <Button onClick={this.handleSubmit}>Submit</Button>
        </FormGroup>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user
})

const mapDispatchToProps = (dispatch) => ({
  getUser: (user) => dispatch(getUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);
