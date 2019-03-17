import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import logo from './smashup.svg';
import classNames from 'classnames';
import './App.css';

import factions from "./data/factions"
import config from "./config"

import FactionList from "./components/FactionList"
import TopBar from "./components/Topbar"
import AppDrawer from "./components/AppDrawer"

function removeDuplicates(myArr, prop) {
  return myArr.filter((obj, pos, arr) => {
      return arr.map(mapObj => mapObj['set']).indexOf(obj['set']) === pos;
  });
}

const sets = removeDuplicates(factions);
const styles = theme => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
    marginTop: '3%'
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: config.drawer.width,
    marginTop: '3%'
  }
})
class App extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      checkedAll: true,
      factions: factions,
      sets: sets
    };
    this.toggleVisibility = this.toggleVisibility.bind(this);
    this.selectAllToggle = this.selectAllToggle.bind(this);
  }

  toggleVisibility(index) {
    return () => {
      const { open, factions, sets } = this.state;
      const item = sets[index];
      const visibility = !item.visible
      sets[index] = { ...item, visible: visibility };
      factions.map(function(faction){
        if(faction.set === item.set) {
          faction.visible = visibility
        }
        return faction
      })
      this.setState({ open, factions: factions, sets: sets });
    }
  };

  selectAllToggle(){
    return () => {
      const { checkedAll, sets } = this.state;
      const checkedToggle = !checkedAll;
      sets.map(function(set){
        set.visible = checkedToggle
        return set
      });
      factions.map(function(faction){
        faction.visible = checkedToggle
        return faction
      })
      
      this.setState({ checkedAll: checkedToggle, sets: sets });
    }
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false});
  };

  render() {
    const { classes } = this.props;
    const { open, factions, sets } = this.state;

    return (
      <div className="appMain">
        <TopBar state={this.state} 
                handleDrawerOpen={this.handleDrawerOpen}/>
        <AppDrawer state={this.state}
                   handleDrawerClose={this.handleDrawerClose}
                   handleDrawerOpen={this.handleDrawerOpen}
                   toggleVisibility={this.toggleVisibility}
                   allChecked={this.selectAllToggle} 
                   sets={sets} />
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <FactionList factions={factions.filter(i => i.visible)} />
        </main>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(App);
