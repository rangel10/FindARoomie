import React, { Component } from 'react';
import {withTracker} from 'meteor/react-meteor-data';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Container, Row, Col } from 'react-grid-system';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import PropTypes from 'prop-types';

class Register extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            userID:'',
            password:'',  
            profileImage:'',
            firstName:'',
            lastName:'',
            email:'',
            password:'',
            phoneNumber:'',
            profileFB: '',
            profileTW: '',
            type: 'Search',
            rooms: {}
        };
        
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleSubmit(event)
    {
        event.preventDefault();
        
        let newUser = {
            email:this.state.email,
            password:this.state.password,
            profile:{ 
                profileImage:this.state.profileImage,
                firstName:this.state.firstName,
                lastName:this.state.lastName,
                phoneNumber:this.state.phoneNumber,
                profileFB: this.state.profileFB,
                profileTW: this.state.profileTW,
                type: 'Search',
                rooms: []   
            }     
        }
        console.log('newUser',newUser);
        if (password!=="" && password!==null)
        {
            Accounts.createUser(newUser, function(err){
                if(err)
                {
                    console.log(err);
                    alert("Error: User cannot be created");
                }
                else
                {
                    alert("User registration succesfull");
                }
            })
        }
        else{
            alert("Not valid password")
        }
        
    }
    
    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value,
        });
    };
    
    render() {  
        return (
            <div className='root'> 
            <h1>Add New User</h1>
            <Container>
            <form action="">
            <Row justify={'center'}>
            <Col md={8}>
            <TextField
            id="email"
            label="Email"
            value={this.state.email}
            className='textField dense'
            onChange={(e) => this.handleChange(e)}
            margin="dense"
            />
            </Col>
            </Row>
            <Row justify={'center'}>
            <Col md={8}>
            <TextField
            id="password"
            label="Password"
            className='textField dense'
            value={this.state.password}
            onChange={(e) => this.handleChange(e)}
            margin="dense"
            type="password"
            />
            </Col>
            </Row>
            <Row justify={'center'}>
            <Col md={8}>
            <TextField
            id="profileImage"
            label="Profile Image (Optional) (Enter the URL of the img)"
            value={this.state.profileImage}
            onChange={(e) => this.handleChange(e)}
            type="text"
            className={'textField dense'}
            margin="dense"
            />
            </Col>
            </Row>
            <Row justify={'center'}>
            <Col md={8}>
            <TextField
            id="firstName"
            label="First Name"
            value={this.state.firstName}
            onChange={(e) => this.handleChange(e)}
            type="text"
            className={'textField dense'}
            margin="dense"
            />
            </Col>
            </Row>
            <Row justify={'center'}>
            <Col md={8}>
            <TextField
            id="lastName"
            label="Last Name"
            value={this.state.lastName}
            className={'textField dense'}
            onChange={(e) => this.handleChange(e)}
            margin="dense"
            />
            </Col>
            </Row>
            
            <Row justify={'center'}>
            <Col md={8}>
            <TextField
            id="phoneNumber"
            label="Phone Number (Optional)"
            value={this.state.phoneNumber}
            className='textField dense'
            onChange={(e) => this.handleChange(e)}
            margin="dense"
            type="number"
            />
            </Col>
            </Row>
            {/*Codigo para la otra entrega */}
            <Row justify={'center'}>
            <Col md={8}>
            <TextField
            id="profileTW"
            label="Twitter Account (Optional) Ex.@danielcagua4"
            className='textField dense'
            value={this.state.profileTW}
            onChange={(e) => this.handleChange(e)}
            margin="dense"
            />
            </Col>
            </Row>
            <Row justify={'center'}>
            <Col md={8}>
            <TextField
            id="profileFB"
            label="Facebook Account (Optional)"
            value={this.state.profileFB}
            className='textField dense'
            onChange={(e) => this.handleChange(e)}
            margin="dense"
            />
            </Col>
        </Row>
        
        <Button variant="contained" size="large" color="primary" className={'button'} onClick={this.handleSubmit}>Create User</Button>
        </form>
        </Container>
        </div>
        );
    }
}

Register.propTypes = {
    user: PropTypes.object
};

export default withTracker(() => {
    Meteor.subscribe('users')
    return {
        users: Meteor.users.find({}).fetch()
    };
})(Register);