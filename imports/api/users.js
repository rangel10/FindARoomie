import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';
  
if (Meteor.isServer) {
    Meteor.publish('users.userID', function userAN(userID) {
      return Usuarios.find({
        userID: userID
      });
    });
  }
  
  Meteor.methods({
    'users.add'({
      userID,
      firstName,
      lastName,
      email,
      phoneNumber,
      profileFB,
      profileTW
    }) {
  
      try {
        Usuarios.insert({
          userID: userID,
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
      const user = Meteor.user.findOne({userID: userID});
      return user;
    },
    'users.updateType'({userID},newType) {
      const user = Meteor.user.findOne({userID: userID});
      Users.update(user[0].userID, type = newType);
      return user;
    },
    'users.updateRooms'({userID},roomsP) {
        const user = Meteor.user.findOne({userID: userID});
        Users.update(user[0].userID, rooms = roomsP);
        return user;
    },
    'users.updateContactInfo'({userID},emailP,phoneNumberP,profileFBP,profileTWP) {
        const user = Meteor.user.findOne({userID: userID});
        Meteor.user.update(user[0].userID, email = emailP);
        Meteor.user.update(user[0].userID, phoneNumber = phoneNumberP);
        Meteor.user.update(user[0].userID, profleFB = profileFBP);
        Meteor.user.update(user[0].userID, profileTW = profileTWP);
        return user;
    }
  });