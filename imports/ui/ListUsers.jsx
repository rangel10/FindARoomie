import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import UserCard from './UserCard.jsx';
import {users} from '../api/users.js';


export class ListUsers extends Component
{
    constructor(props)
    {
      super(props);
      this.state={}
    }
    renderUsers()
    {
      return this.props.users.map((r)=>{
          let description = "Hi Im a user!";
          return(
              <div className="col-sm">
              <UserCard
              profileImage='https://static.thenounproject.com/png/17241-200.png'
              firstName={r.firstName}
              lastName={r.lastName}
              description={description}
              type={r.type}
              rooms={r.rooms}
              />
              </div>
              
          );
      })
  };
    render() 
    {
        return (
          <div className='container'>
           <h1>Aca va la lista de usuarios</h1>
          <div className="row">
          {this.renderUsers()}
          </div>
          </div>
        );
    }
}

ListUsers.propTypes={
  users: PropTypes.array.isRequired
}

export default withTracker(() => 
{
    Meteor.subscribe("users")
    return {
      users: Meteor.users.find({}).fetch()
    };
})(ListUsers);