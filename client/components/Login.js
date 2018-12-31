import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../store';
import { InputLabel, Input, FormGroup, Button, Typography, Grid, TextField } from '@material-ui/core';



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
    this.props.history.push('/')
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <div>
        <Grid container
          direction="column"
          alignItems="center"
          justify="center"
          >
          <Typography variant="h2" color="textPrimary">Skeptic's Annotated Bible</Typography>
        </Grid>

        <Grid container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: '100vh' }}
        >

          <Typography variant="h2">Login</Typography>
          <br />
          <FormGroup>
              <TextField label="email" name="email" type="text" onChange={this.handleChange} value={this.state.emailInput}/>
              <TextField label="password" name="password" type="text" onChange={this.handleChange} value={this.state.passwordInput}/>
              <Button onClick={this.handleSubmit}>Submit</Button>
          </FormGroup>
        </Grid>
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
