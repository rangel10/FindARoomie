import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

//Imports carpeta ui
import MenuAppBar from './MenuAppBar.jsx';



export class App extends Component {

  render() {
    return (
      <div>
        <MenuAppBar/>
        <div className="content">
          {this.props.children}
        </div>              
      </div>
    );
  }
}

export default withTracker(() => {
  return {
    user: Meteor.user()
  };
})(App);