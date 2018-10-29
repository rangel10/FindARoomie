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
        alert('User Loged In!');
        
    }
    handleChange(event) 
    {
        let name = event.target.id;
        let value = event.target.value;
        this.setState({ [name]: value });
    }
    render() 
    {
        return(
            <div class="form-box">
            <div class="head">Find a Roomie</div>        
            <form onSubmit={this.handleSubmit}
            action="#" id="login-form">
            <div class="form-group">
            <label class="label-control">
            <span class="label-text">Email</span>
            </label>
            <input type="email" name="email" class="form-control" onChange={this.handleChange} value={this.state.email} />
            </div>
            <div class="form-group">
            <label class="label-control">
            <span class="label-text">Password</span>
            </label> 
            <input type="password" name="password" class="form-control" onChange={this.handleChange} value={this.state.password}/>
            </div>
            <input type="submit" value="Login" class="btn" onClick={e=>this.onSubmit(e)}/>
            <p class="text-p">Don't have an account? <a href="#">Sign up</a> </p>
            </form>
            </div>
            
            );
        }
    }