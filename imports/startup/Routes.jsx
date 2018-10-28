import React from 'react';
//import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';  

//Import App
import App from '../ui/App';

//Import componentes
import AccountsUIWR from '../ui/AccountsUIWrapper';
import AddRoom from '../ui/AddRoom';
import Hello from '../ui/Hello';


FlowRouter.route('/', {
  name: 'main',
  action() {
    mount(App, {
      content: <Hello/>
    });
  },
});

FlowRouter.route('/addroom', {
  name: 'main',
  action() {
    mount(App, {
      content: <AddRoom/>
    });
  },
});

FlowRouter.route('/Account', {
  name: 'Account',
  action() {
    mount(AccountsUIWR);
  },
});
