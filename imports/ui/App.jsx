import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

//Imports carpeta ui
import AccountsUIWrapper from './AccountsUIWrapper.js';

//Imports de prueba carpeta UI
import ListRooms from './ListRooms.jsx';
import ListUsers from './ListUsers.jsx';
import Navbar from './Navbar.jsx';
import MenuAppBar from './MenuAppBar.jsx';
import RoomCard from './RoomCard.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';


export class App extends Component {

  render() {
    return (
      <div>
        <MenuAppBar/>
        <div className="content">
          {this.props.children}
        </div>
        {/* <AccountsUIWrapper/>
        {this.props.content}
        <h4>Contenido de prueba</h4>
        <ListRooms/>
        <RoomCard/>
        <ListUsers/>
        <h4>Test Auth</h4>
        <Register/> */}
        
        
      </div>
    );
  }
}

export default withTracker(() => {
  return {
    user: Meteor.user()
  };
})(App);