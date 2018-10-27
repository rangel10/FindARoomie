import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';  

//Import App
import App from "../ui/App";

//Import componentes
import AccountsUIWR from "../ui/components/AccountsUIWrapper";


FlowRouter.route('/', {
  name: 'main',
  action() {
    mount(App);
  },
});

FlowRouter.route('/Account', {
  name: 'Account',
  action() {
    mount(AccountsUIWR);
  },
});
