<<<<<<< HEAD
import React from 'react';
import Navbar from "./components/Navbar";

const App = () => (
  <div>
    <Navbar />
    <div className="container">
    <h1>Welcome to FindARoomie!</h1>
    <h4>The perfect place to find a Roomie in the ideal place</h4>
    </div>
  </div>
);
=======
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

>>>>>>> 771ae3efb769c86d761a710b6cc94280db3a18fa

//Imports carpeta ui
import AccountsUIWrapper from './AccountsUIWrapper.js';

export class App extends Component {

  render() {
    return (
      <div className = "app">
            <AccountsUIWrapper/>
      </div>
    );
  }
}

export default withTracker(() => {
  return {
    user: Meteor.user()
  };
})(App);
