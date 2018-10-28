import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

export class ListUsers extends Component
{
    render() 
    {
        return (
          <div>
            <h1>Aca va la lista de usuarios</h1>
          </div>
        );
    }

}

export default withTracker(() => 
{
    Meteor.subscribe("users")
    return {
      room: Meteor.users.find({}).fetch()
    };
})(ListUsers);