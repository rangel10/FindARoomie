import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

//Imports carpeta ui
import AccountsUIWrapper from './AccountsUIWrapper.js';

//Imports de prueba carpeta UI
import ListRooms from './ListRooms.jsx';
import ListUsers from './ListUsers.jsx';

export class App extends Component {

  render() {
    return (
      <div className = "app">
        <AccountsUIWrapper/>
        {this.props.content}
        <h4>Contenido de prueba</h4>
        <ListRooms/>
        <ListUsers/>
      </div>
    );
  }
}

export default withTracker(() => {
  return {
    user: Meteor.user()
  };
})(App);