import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import {withTracker} from 'meteor/react-meteor-data';

class RoomView extends Component {
  render() {
    const {

    } = this.props;

    return (
      <div>
        <h1>{}</h1>
      </div>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('userData');
  Meteor.subscribe('rooms');
  return {
    user: Meteor.user()
    room: Room
  };
})(RoomView);