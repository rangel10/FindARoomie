import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';
  
if (Meteor.isServer) {
  Meteor.publish('users', () => {
    return Meteor.users.find({});
  });
}
  
  Meteor.methods({
    'users.add'({
      firstName,
      lastName,
      email,
      phoneNumber
    }) {
  
      try {
        Meteor.users.insert({
          userID:  '' + (Meteor.users.find({}).count+1),
          profileImage: "",
          firstName: firstName,
          lastName: lastName,
          email: email,
          phoneNumber: phoneNumber,
          profileFB: "",
          profileTW: "",
          type: "Search",
          rooms: {}
        });
        return true;
      } catch (err) {
        if (err) {
          if (err.code === 11000) {
            throw new Meteor.Error("The user with the ID or Email given allready exist");
          } else {
            throw new Meteor.Error("Error during creating a new user. Please try again.");
          }
        }
      }
  
    },
    'users.findById'({userID}) {
      check(userID, String);
      const user = Meteor.users.findOne({userID: userID})
      return user;
    },
    'users.findAll'(){
      const users = Meteor.users.find()
      return users;
    },
    'users.updateType'({userID},newType) {
      const user = Meteor.users.findOne({userID: userID});
      Meteor.users.update(user[0].userID, type = newType);
      return user;
    },
    'users.updateRooms'({userID},roomsP) {
        const user = Meteor.users.findOne({userID: userID});
        Meteor.users.update(user[0].userID, rooms = roomsP);
        return user;
    },
    'users.updateContactInfo'({userID},emailP,phoneNumberP,profileFBP,profileTWP) {
        const user = Meteor.users.findOne({userID: userID});
        Meteor.users.update(user[0].userID, email = emailP);
        Meteor.users.update(user[0].userID, phoneNumber = phoneNumberP);
        Meteor.users.update(user[0].userID, profleFB = profileFBP);
        Meteor.users.update(user[0].userID, profileTW = profileTWP);
        return user;
    }
  });