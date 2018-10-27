Accounts.onCreateUser(function(options, user) 
{
  // Use provided profile in options, or create an empty object
  user.profile = options.profile || {};
  // Assigns first and last names to the newly created user object
  user.profile.firstName = options.firstName;
  user.profile.lastName = options.lastName;
  user.profile.profileImage = options.profileImage;
  user.profile.email = options.email;
  user.profile.phoneNumber = options.phoneNumber;
  user.profile.profileFB = '';
  user.profile.profileTW = '';
  user.profile.type = options.type;
  user.profile.rooms = [];
  
  // Returns the user object
  return user;
});