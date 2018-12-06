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
  'chatrooms.createRoom': function(usersrc,userdst){
    // Code Review - Ricardo Andres Angel Villadiego
    // No mantener codigo documentado en esta forma, es mejor eliminarlo si no se usa
    /* let idChat = ChatRooms.upsert(
      {$or:[{user1:usersrc,user2:userdst},{user1:userdst,user2:usersrc}]},
      {
        user1:usersrc,
        user2:userdst,
        messages:[]
      }); */
    let idRoom = ChatRooms.findOne(
      {$or:[{user1:usersrc,user2:userdst},{user1:userdst,user2:usersrc}]});
    console.log(idRoom);
    if (idRoom === undefined){
      // Code Review - Ricardo Andres Angel Villadiego
      // Quitar logs despues de debuguear
      console.log('creando sala');   
      idRoom = ChatRooms.insert(
        {
          user1:usersrc,
          user2:userdst,
          messages:[]
        });
      console.log(idRoom);
    }
    return idRoom;
  },
  'chatrooms.sendMessage': function(message,userSrc,userDst){
    ChatRooms.update(
      {$or:[{user1:userSrc,user2:userDst},{user1:userDst,user2:userSrc}]},
      {$push:{messages:{time:Date.now(),user:userSrc,text:message}}},{},(err,i) => {console.log(err,i);});
    console.log(message,'sent');
  }
});
