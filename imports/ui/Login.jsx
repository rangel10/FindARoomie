import React, { Component } from 'react';
import {withTracker} from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { withRouter } from 'react-router-dom';
import '../styles/Login.css';

export default class Login extends Component {
  constructor(props)
  {
    super(props);
    this.state={
      email:'',
      password:''
    };
    //Handlers
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
    
  handleSubmit(event)
  {
    event.preventDefault();
    Meteor.loginWithPassword(this.state.email,this.state.password, function(err,result){
      if(err){console.log(err);}
      if(Meteor.user()){
        window.location.assign('/viewRooms');
      }
    });
    
  }
  handleChange(event) 
  {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({ [name]: value });
  }
  render() 
  {
    return(
      <div className="form-box">
        <div className="head">Find a Roomie</div>        
        <form onSubmit={this.handleSubmit}
          action="#" id="login-form">
          <div className="form-group">
            <input placeholder='Email' type="email" name="email" className="form-control" onChange={this.handleChange} value={this.state.email} />
          </div>
          <div className="form-group">
            <input placeholder='Password' type="password" name="password" className="form-control" onChange={this.handleChange} value={this.state.password}/>
          </div>
          <input type="submit" value="Login" className="btn" onClick={e=>this.handleSubmit(e)}/>
          <p className="text-p">Don't have an account? <a href="/register">Sign up</a> </p>
        </form>
      </div>
            
    );
  }
}