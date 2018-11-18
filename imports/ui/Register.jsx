import React, { Component } from 'react';
import {withTracker} from 'meteor/react-meteor-data';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Container, Row, Col } from 'react-grid-system';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import request from 'superagent';
import '../styles/Register.css';
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
        this.onPhotoSelected = this.onPhotoSelected.bind(this);
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
                    window.location.assign('/viewrooms')
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

    onPhotoSelected(files) {
        const url = `https://api.cloudinary.com/v1_1/farappcloud/upload`;
        const title = 'profilePic';
        const public_id = Date.now()
        this.setState({profileImage:public_id});
        let file = files[0]
            const photoId = this.photoId++;
            const fileName = file.name;
            request.post(url)
                .field('upload_preset', 'gmhku0ka')
                .field('file', file)
                .field('public_id', public_id)
                .field('tags', title ? `myphotoalbum,${title}` : 'myphotoalbum')
                .field('context', title ? `photo=${title}` : '')
                .on('progress', (progress) => this.onPhotoUploadProgress(photoId, file.name, progress))
                .end((error, response) => {
                    this.onPhotoUploaded(photoId, fileName, response);
                });
    }

    onPhotoUploadProgress(id, fileName, progress) {
        console.log(id,fileName,progress);
    }

    onPhotoUploaded(id, fileName, response) {
        console.log(id,fileName,response.body);
    }
    
    render() {  
        return (
            <div className='root'> 
            <h1>Add New User</h1>
            <Container>
            <form action="">
            <Row justify={'center'}>
            <Col md={8}>
            <input
                accept="image/*"
                className='input'
                id="contained-button-file"
                type="file"
                ref={fileInputEl =>
                    (this.fileInputEl = fileInputEl)
                }
                onChange={() =>
                    this.onPhotoSelected(
                        this.fileInputEl.files
                    )
                }
            />
            <label htmlFor="contained-button-file">
                <Button letiant="contained" component="span" className='button'>
                Upload
                </Button>
            </label>
            </Col>
            </Row>
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
        
        <Button letiant="contained" size="large" color="primary" className={'button'} onClick={this.handleSubmit}>Create User</Button>
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