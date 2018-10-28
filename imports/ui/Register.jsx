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

class Register extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            userID:'',  
            profileImage:'',
            firstName:'',
            lastName:'',
            email:'',
            phoneNumber:'',
            profileFB: '',
            profileTW: '',
            type: 'Search',
            rooms: {}
        };
        
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleSubmit()
    {
        const newUser = {
            userID:this.props.userID,  
            profileImage:this.props.profileImage,
            firstName:this.props.firstName,
            lastName:this.props.lastName,
            email:this.props.email,
            phoneNumber:this.props.phoneNumber,
            profileFB: '',
            profileTW: '',
            type: 'Search',
            rooms: {}
        };
        console.log('newUser',newUser);
        Meteor.call('users.addUser',newUser)
        
    }
    
    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value,
        });
    };
    
    render() {
        if(Meteor.user()){
            
        }
        else{
            return (
                <div className='root'> 
                <h1>Add New User</h1>
                <Container>
                <form action="">
                <Row justify={'center'}>
                <Col md={8}>
                <TextField
                id="addUser"
                label="addUser"
                multiline
                rows="4"
                className={'textField'}
                onChange={(e) => this.handleChange(e)}
                />
                </Col>
                </Row>
                <Row justify={'center'}>
                <Col md={8}>
                <TextField
                id="profileImage"
                label="Imagen del Usuario"
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
                className={'textField dense'}
                onChange={(e) => this.handleChange(e)}
                margin="dense"
                />
                </Col>
                </Row>
                <Row justify={'center'}>
                <Col md={8}>
                <TextField
                id="email"
                label="Email"
                className='textField dense'
                onChange={(e) => this.handleChange(e)}
                margin="dense"
                />
                </Col>
                </Row>
                <Row justify={'center'}>
                <Col md={8}>
                <TextField
                id="phoneNumber"
                label="Phone Number"
                className='textField dense'
                onChange={(e) => this.handleChange(e)}
                margin="dense"
                type="number"
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
    }
    
    export default withTracker(() => {
        Meteor.subscribe('users');
        return {
            user: Meteor.user()
        };
    })(Register);