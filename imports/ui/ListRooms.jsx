import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';

import { Rooms } from '../api/rooms.js';

export class ListRooms extends Component
{
  constructor(props)
  {
    super(props)
    this.state={}
  }
    renderRooms()
    {
      return this.props.rooms.map()
    }
    render() 
    {
        return (
          <div>
            <h1>Aca va la lista de salas</h1>
          </div>
        );
    }

}

ListRooms.propTypes ={
  rooms: PropTypes.array.isRequired
}

export default withTracker(() => 
{
    Meteor.subscribe("rooms")
    return {
      rooms: Rooms.find({}).fetch()
    };
})(ListRooms);