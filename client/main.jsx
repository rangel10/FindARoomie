import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import App from '/imports/ui/App';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import '../imports/startup/accounts-config.js';

//Componentes
import Hello from '../imports/ui/Hello';
import Register from '../imports/ui/Register';
import Login from '../imports/ui/Login';
import ListRooms from '../imports/ui/ListRooms';
import RoomView from '../imports/ui/RoomView';
//import '../imports/startup/Routes';

Meteor.startup(() => {
  render(
    <Router>
      <App>
        <Switch>
          <Route exact path="/" component={Hello}/>
          <Route exact path="/register" component={Register}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/viewrooms" component={ListRooms}/>
          <Route exact path="/viewrooms/:roomId" component={RoomView}/>
        </Switch>
      </App>
    </Router>
    ,document.getElementById('target'));
  //render(<App />, document.getElementById('react-target'));
});
