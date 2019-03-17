import React, { Component } from "react";
import AppBar from '@material-ui/core/AppBar';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';

import config from "../config"

const styles = theme => ({
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    })
  },
  appBarShift: {
    width: `calc(100% - ${config.drawer.width}px)`,
    marginLeft: config.drawer.width,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
    color: 'white'
  },
  hide: {
    display: 'none',
  }
})

class TopBar extends Component {
  render(){
    const { classes, state, handleDrawerOpen } = this.props;
    return (
      <AppBar position="fixed" className={
        classNames(classes.appBar, {[classes.appBarShift]: state.open,})
      }>
        <Toolbar disableGutters={!state.open}>
          <IconButton 
          aria-label="Open drawer"
          onClick={handleDrawerOpen}
          className={classNames(classes.menuButton, state.open && classes.hide)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit">
            Smash Up Faction Manager
          </Typography>
        </Toolbar>
      </AppBar>
    ) 
  }
}

export default withStyles(styles, { withTheme: true })(TopBar);