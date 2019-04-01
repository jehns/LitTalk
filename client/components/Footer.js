import React from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom'
import {  BottomNavigation, BottomNavigationAction} from '@material-ui/core';
import { Home, ArrowForward, ArrowBack} from '@material-ui/icons';


const Footer = (props) => {

  return (
    <BottomNavigation showLabels style={{position: 'fixed', bottom: 10}} onChange={props.onChange}>
          <BottomNavigationAction label="Home" icon={<Home />} value="home" />
          <BottomNavigationAction label="Last Chapter" icon={<ArrowBack />} value="last"/>
          <BottomNavigationAction label="Next Chapter" icon={<ArrowForward />} value="next"/>
    </BottomNavigation>
  )
}


// const mapStateToProps = (state) => ({
// });

// const mapDispatchToProps = (dispatch) => ({
// });

export default withRouter(connect(null, null)(Footer));
