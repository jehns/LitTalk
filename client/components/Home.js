import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink, Redirect } from 'react-router-dom';
import { getChapterVerses } from '../store'
import { Typography, Grid, List, ListItem } from '@material-ui/core';


class Home extends Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <div>
        <Grid container
          direction="column"
          alignItems="center"
          justify="center"
        >
          {/* <Typography variant="h2" color="textPrimary">Skeptic's Annotated Bible</Typography> */}
        </Grid>


        <br />
        {this.props.user.id ?
          <Grid container
          direction="column"
          alignItems="center"
          justify="center">
          <Typography variant="h4" color="textPrimary">Welcome, {this.props.user.name}!</Typography>
        </Grid>: ""}
        <br />
        <br />
        <br />
        <br />


        <Grid container
          direction="row"
          alignItems="center"
          justify="center"
          style={{position: 'fixed'}}
          >
          <Grid item sm>

            <Grid container
                direction="column"
                alignItems="center"
                justify="center"
                >

              {/* <Typography variant="h5" style={{position: 'fixed'}}>Old Testament</Typography> */}


              <Grid item>
                {/* <List >
                  <ListItem>
                    <Typography variant="body2">Old Testament1</Typography>
                  </ListItem>
                  <ListItem>
                    <Typography variant="body2">Old Testament2</Typography>
                  </ListItem>
                  <ListItem>
                    <Typography variant="body2">Old Testament3</Typography>
                  </ListItem>
                </List> */}
              </Grid>

            </Grid>

          </Grid>

          <Grid item sm>

            <Grid container
              direction="column"
              alignItems="center"
              justify="center">
              {/* <Typography variant="h5" style={{position: 'fixed'}}>New Testament</Typography> */}
              <br />
              <br />
              <NavLink to='/dune/1' style={{textDecoration: 'none'}}>Dune</NavLink>
            </Grid>

          </Grid>

          <Grid item sm>
            <Grid container
                direction="column"
                alignItems="center"
                justify="center">
            </Grid>
          </Grid>
        </Grid>
        <br />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user
})

// const mapDispatchToProps = (dispatch) => {}

export default withRouter(connect(mapStateToProps, null)(Home));
