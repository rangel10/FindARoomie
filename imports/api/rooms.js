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
    
    let id = Rooms.insert({
      owner:room.owner,
      titulo:room.titulo,
      descripcion:room.descripcion,
      precio:room.precio,
      tamano:room.tamano,
      sector:room.sector,
      direccion:room.direccion,
      servicios:room.servicios,
      reglas:room.reglas
    });
    console.log('insertado',id);
    let result = Meteor.users.find({username:room.owner},{fields:{'profile':1,'_id':0}}).fetch();
    console.log(result[0].profile.rooms);
    result[0].profile.rooms.push(id);
    console.log(result[0]);
    Meteor.users.update({username: room.owner}, {$set: {'profile.rooms': result[0].profile.rooms}});
  }
});
