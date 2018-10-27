import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

export const Rooms = new Mongo.Collection('rooms');

if(Meteor.isServer){
  Meteor.publish('rooms', () =>{
    return Rooms.find({});
  });
}

Meteor.methods({
  'rooms.addRoom':function(room){
    Rooms.insert({owner:room.owner}, room);
    Meteor.users.update(
      {username: room.owner},
      { $push: { 'profile.rooms': room._id }}
    );
  }
});