import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

//Imports carpeta ui
import AccountsUIWrapper from './AccountsUIWrapper.js';

export class App extends Component {

  render() {
    return (
      <div className = "app">
        <AccountsUIWrapper/>
        {this.props.content}
      </div>
    );
  }
}

export default withTracker(() => {
  return {
    user: Meteor.user()
  };
})(App);
