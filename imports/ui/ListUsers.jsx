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
      return this.props.users.map((r,i)=>{
          let description = "Hi Im a user!";
          return(
              <div className="row">
              <UserCard
              key={i}
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
          <div className='listUsers'>
          <h1>Aca va la lista de usuarios</h1>
          <div className="grid-container">
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
    console.log("Subscribing")
    Meteor.subscribe("users");
    console.log("Subscribed!");
    console.log(Meteor.users.find({}).fetch());
    return {
      users: Meteor.users.find({}).fetch()
    };
    
})(ListUsers);