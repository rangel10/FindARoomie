import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Rooms } from '../api/rooms';

export class ListRooms extends Component
{
    render() 
    {
        return (
          <div>
            <h1>Aca va la lista de salas</h1>
          </div>
        );
    }

}

export default withTracker(() => 
{
    Meteor.subscribe("rooms")
    return {
      room: Rooms.find({}).fetch()
    };
})(ListRooms);