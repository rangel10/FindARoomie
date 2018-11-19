/* global process */
import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

export const ChatRooms = new Mongo.Collection('chatrooms');

if(Meteor.isServer){
  Meteor.publish('chatrooms', () =>{
    return ChatRooms.find({});
  });
}

Meteor.methods({
  'chatrooms.createRoom': function(user1,user2){
    let idChat = ChatRooms.upsert(
      {
        user1:user1,
        user2:user2},
      {
        user1:user1,
        user2:user2,
        messages:[]
      });
    console.log(idChat);
  }
});
