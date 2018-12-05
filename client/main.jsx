import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import App from '/imports/ui/App';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import '../imports/startup/accounts-config.js';

//Componentes
import Register from '../imports/ui/Register';
import Login from '../imports/ui/Login';
import ListRooms from '../imports/ui/ListRooms';
import RoomView from '../imports/ui/RoomView';
import AddRoom from '../imports/ui/AddRoom';
import LandingPage from '../imports/ui/LandingPage.jsx';
import ChatRoom from '../imports/ui/ChatRoom';
import Notifications from '../imports/ui/Notifications';
//import '../imports/startup/Routes';

Meteor.startup(() => {
  render(
    <Router>
      <App>
        <Switch>
          <Route exact path="/" component={LandingPage}/>
          <Route exact path="/register" component={Register}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/addroom" component={AddRoom}/>
          <Route exact path="/viewrooms" component={ListRooms}/>
          <Route exact path="/viewrooms/:roomId" component={RoomView}/>
          <Route exact path="/viewrooms/chatRoom/:userId" component={ChatRoom}/>
          <Route exact path="/notifications" component={Notifications}/>
          {/* <Route 
            path="/chatRoom" 
            render={(props) => <ChatRoom {...props}
            />} 
          /> */}
        </Switch>
      </App>
    </Router>
    ,document.getElementById('target'));
  //render(<App />, document.getElementById('react-target'));
});
