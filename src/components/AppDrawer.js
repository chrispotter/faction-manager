import React, { Component } from "react";
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

import { withStyles } from '@material-ui/core/styles';

import config from "../config"

const styles = theme => ({
  drawer: {
    width: config.drawer.width,
    flexShrink: 0,
  },
  drawerPaper: {
    width: config.drawer.width,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }
});

class AppDrawer extends Component {
  render() {
    const { 
      classes, 
      state,
      handleDrawerClose,
      toggleVisibility,
      allChecked,
      theme,
      sets } = this.props;
    return(
      <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={state.open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
            <ListItem >
              <ListItemText primary="Available Sets" />
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem >
              <ListItemIcon>
                  <Checkbox
                    checked={state.checkedAll}
                    onChange={allChecked()} 
                    name="isVisible"
                    color="primary"
                  />            
              </ListItemIcon>
              <ListItemText primary={state.checkedAll ? "Deselect All" : "Select All"} />
            </ListItem>
          </List>
          <Divider />
          <List>
            {sets.map(({set, visible}, index) => (
              <ListItem key={set}>
                <ListItemIcon>
                  <Checkbox
                    checked={visible}
                    onChange={toggleVisibility(index)} 
                    name="isVisible"
                    color="primary"
                  />
                </ListItemIcon>
                <ListItemText primary={set} />
              </ListItem>
            ))}
          </List>
        </Drawer>
    );
  }
}

export default withStyles(styles, { withTheme: true })(AppDrawer);