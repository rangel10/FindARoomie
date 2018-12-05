import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
// Imports manejo usuarios
import { Meteor } from 'meteor/meteor';
import {withTracker} from 'meteor/react-meteor-data';
import '../styles/MenuAppBar.css';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class MenuAppBar extends React.Component {
  state = {
    auth: true,
    anchorEl: null,
  };

  handleChange = event => {
    this.setState({ auth: event.target.checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleHome = () => {
    window.location.assign('/');
  };


  handleLogout = () => {
    Meteor.logout((err,result) => {
      if(err){console.log(err);}
      window.location.assign('/');
    });
  };

  handleLogin = () => {
    window.location.assign('/login');
  };

  handleOffer = () => {
    window.location.assign('/addroom');
  };

  handleViewRooms = () => {
    window.location.assign('/viewrooms');
  };

handleNotifications = () => {
  window.location.assign('/notifications');
};

renderMenu(){
  if(!Meteor.user()){
    return(
      <Button variant="contained"
        className={'button'}
        onClick={this.handleLogin}
      >
        Iniciar Sesion
        <AccountCircle />
      </Button>
    );
  }
  else{
    return(
      <Button variant="contained"
        color="primary" 
        className={'button'}
        aria-owns={open ? 'menu-appbar' : undefined}
        aria-haspopup="true"
        onClick={this.handleMenu}
      >
        {this.props.user!=undefined?this.props.user.emails[0].address:'Iniciar Sesion'}
        <AccountCircle />
      </Button>
    );
  }
}

render() {
  const { classes } = this.props;
  const { auth, anchorEl } = this.state;
  const open = Boolean(anchorEl);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography onClick={this.handleHome} variant="h6" color="inherit" className={classes.grow}>
              Find a Roomie
        </Typography>
        <Button 
          id={'boton-navbar1'}
          className={'button'}
          onClick={this.handleOffer}
        >
            Ofrecer
        </Button>
        <Button 
          id={'boton-navbar1'}
          className={'button'}
          onClick={this.handleViewRooms}
        >
            Buscar Habitaciones
        </Button>
        <IconButton onClick={this.handleNotifications} aria-label="4 pending messages">
          <Badge badgeContent={4} color="primary">
            <MailIcon />
          </Badge>
        </IconButton>
        {auth && (
          <div>
            {this.renderMenu()}
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={this.handleClose}
            >
              <MenuItem onClick={this.handleLogout}>Cerrar Sesion</MenuItem>
              <MenuItem onClick={this.handleClose}>My account</MenuItem>
            </Menu>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
}
}

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withTracker(() => {  
  Meteor.subscribe('users');
  return {
    user: Meteor.user()
  };
})(MenuAppBar));


