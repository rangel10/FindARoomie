import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Rooms = new Mongo.Collection('rooms');

if (Meteor.isServer) 
{
  Meteor.publish ('rooms', () => {
    return Rooms.find({});
  });
}

Meteor.methods(
  {
    'rooms.add': function() 
    {
      const userId = '' + (rooms.find({}).count+1);
      const name = Meteor.user().username;

      if(!name)
      {
        throw new Meteor.Error('Not Authorized');
      }
      rooms.upsert(
        {userId},
        {
          userId: uId,
          name,
          win:0,
          tie:0,
          lost:0
        });

      const player = rooms.findOne({userId});
      return player;
    },

    'rooms.findById': function(id){
      const player = rooms.find({id: Meteor.userId()}).fetch();
    },

    'rooms.updateWin': function(id){
      const player = rooms.find({id: Meteor.userId()}).fetch();
      rooms.update(player[0].userId, win = win+1);
    },

    'rooms.updateLost': function(id){
      const player = rooms.find({id: Meteor.userId()}).fetch();
      rooms.update(player[0].userId, lost = lost+1);
    },

    'rooms.updateTie': function(id){
      const player = rooms.find({id: Meteor.userId()}).fetch();
      rooms.update(player[0].userId, tie = tie+1);
    }
  }
);