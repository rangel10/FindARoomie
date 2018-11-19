import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { ChatRooms } from '../api/chatRoom';

class ContactVIew extends Component {


  render() {
    return (
      <div>
        {this.props.match.params.userId}
        <button onClick={() => {Meteor.call('chatrooms.createRoom',this.props.user1._id,this.props.match.params.userId);}}>CLICK</button>
      </div>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('chatrooms');
  console.log(Meteor.userId());
  return {
    chatRoom: ChatRooms.find(
      {$or: [
        { user1: Meteor.userId() },
        { user2: Meteor.userId()},
      ]
      }).fetch(),
    user1: Meteor.user()
  };
})(ContactVIew);