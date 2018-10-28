import React, { Component } from 'react';
import {withTracker} from 'meteor/react-meteor-data';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import { Container, Row, Col } from 'react-grid-system';
import { Meteor } from 'meteor/meteor';
import '../styles/AddRoom.css';

class Login extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            user:'',
            password:''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleSubmit(event) 
    {
        event.preventDefault();
        Meteor.loginWithPassword(this.state.user, this.state.password, (er) =>{
            if (er){
                M.toast({html: er.reason});
            }
            else
            {
                console.log("se ha loggeado")
                let current = Meteor.user();
                Session.set("current", current);
                M.toast({ html: "Se ha loggeado correctamente!" });
                FlowRouter.go('/')
            }
        }),
        
        handleChange(event) 
        {
            let name = event.target.id;
            let value = event.target.value;
            this.setState({ [name]: value });
        }
        
        render() 
        {
            if(!Meteor.user())
            {
                return(<div><h3>You have to Log In!</h3></div>);
            }
            else{
                return (
                    <div>
                    
                    <div className="row">
                    <div className="container">
                    <h4 className="text-center">Login</h4>
                    <form onSubmit={this.handleSubmit.bind(this)} className="col offset-s4 s4">
                    <div className="row">
                    <div className="input-field col s12">
                    <input id="user" type="text" className="validate" onChange={this.handleChange.bind(this)}/>
                    <label htmlFor="user">User</label>
                    </div>
                    </div>
                    <div className="row">
                    <div className="input-field col s12">
                    <input id="password" type="password" className="validate" onChange={this.handleChange.bind(this)}/>
                    <label htmlFor="password">Contraseña</label>
                    </div>
                    </div>
                    <div className="row">
                    <button className="waves-effect waves-light btn btn-block">
                    Crear Usuario
                    </button>
                    </div>
                    </form>
                    </div>
                    </div>
                    
                    </div>
                    );
                }
            }
        }
    }
    
    export default withTracker(() => {
        Meteor.subscribe('users');
        return 
        {
            user: Meteor.user()
        };
    })(Login);