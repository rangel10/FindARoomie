import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import {withTracker} from 'meteor/react-meteor-data';

import AccountsUIWrapper from './AccountsUIWrapper.js';

class Navbar extends Component {
 
  render() {
    if(this.props.user)
    {
        return(
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark  fixed-top" >
              <a className="navbar-brand" href="/">
              <strong>Find a Roomie</strong>
              </a>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                  <div className="navbar-nav">
                  
                    <a className="nav-item nav-link" href="/home">Home</a>
                    <a className="nav-item nav-link" href="/findRoomies">Find Roomies</a>
                    <a className="nav-item nav-link" href="/findRooms">Find Rooms</a>
                    <a className="nav-item nav-link">Loged In! - Welcome: </a>
                    <AccountsUIWrapper/> 
              </div>
              </div>
            </nav> 
        )    
    }
    else
    {
      return(
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark  fixed-top" >
            <a className="navbar-brand" href="/">
               <strong>Find a Roomie</strong>
             </a>
             <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                 <span className="navbar-toggler-icon"></span>
             </button>
             <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                 <div className="navbar-nav">
                 
                   <a className="nav-item nav-link" href="/home">Home</a>
                   <a className="nav-item nav-link">Need to Log In to access the site</a>
                   <a className="nav-item nav-link">User not Active</a>
                   <AccountsUIWrapper/> 
             </div>
             </div>
           </nav> 
      )    
  }
}
}
Navbar.propTypes = 
{
  user: PropTypes.object
};

export default withTracker(() => {  
  return {
    user: Meteor.user()
  };
})(Navbar);