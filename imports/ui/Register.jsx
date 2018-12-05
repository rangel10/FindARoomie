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
      rooms: {},
      errors: {}
    };
        
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onPhotoSelected = this.onPhotoSelected.bind(this);
  }
    
  handleSubmit(event)
  {
    event.preventDefault();
    if(this.validateForm()){
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
      };
      console.log('newUser',newUser);
      if (password!=='' && password!==null)
      {
        Accounts.createUser(newUser, function(err){
          if(err)
          {
            console.log(err);
            alert('Error: User cannot be created');
          }
          else
          {
            window.location.assign('/viewrooms');
          }
        });
      }
      else{
        alert('Not valid password');
      }
    }
        
  }

  validateForm() {
    console.log('Validando el Usuario');

    let errors = {};
    let formIsValid = true;
    let email=this.state.email;
    let password=this.state.password;
    let firstName=this.state.firstName;
    let lastName=this.state.lastName;
    console.log('Variables');
    console.log(email);
    console.log(password);
    console.log(firstName);
    console.log(lastName);
        
    if (!email) 
    {
      formIsValid = false;
      errors['email'] = 'Ingresa un Email.';
    }
    
    if (typeof email !== 'undefined') {
      //regular expression for email validation
      var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
      if (!pattern.test(email)) {
        formIsValid = false;
        errors['email'] = '*Ingresa un Email Valido.';
      }
    }
    if (!password) {
      formIsValid = false;
      errors['password'] = 'Ingresa un Password.';
    }
    
    /* if (typeof password !== 'undefined') {
      if (!password.match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
        formIsValid = false;
        errors['password'] = 'Ingrese un Password. (Debe tener 8 o mas caracteres, 1 numero, 1 letra mayuscula, 1 letra minuscula y un caracter especial)';
      }
    } */

    if (!firstName) {
      formIsValid = false;
      errors['firstName'] = 'Ingresa tu Nombre';
    }
    
    if (typeof firstName !== 'undefined') {
      if (!firstName.match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        errors['firstName'] = 'Ingresa un Nombre Valido. (Debe tener solamente caracteres alfabeticos)';
      }
    }

    if (!lastName) {
      formIsValid = false;
      errors['lastName'] = 'Ingresa tu apellido';
    }
    
    if (typeof lastName !== 'undefined') {
      if (!lastName.match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        errors['lastName'] = 'Ingresa un Apellido Valido. (Debe tener solamente caracteres alfabeticos)';
      }
    }

    this.setState({
      errors: errors
    });
    return formIsValid;
  }
    
    handleChange = event => {
      this.setState({
        [event.target.id]: event.target.value,
      });
    };

    onPhotoSelected(files) {
      const url = 'https://api.cloudinary.com/v1_1/farappcloud/upload';
      const title = 'profilePic';
      const public_id = Date.now();
      this.setState({profileImage:public_id.toString()});
      let file = files[0];
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
          <h1>Formulario de Nuevo Usuario</h1>
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
                Cargar Imagen
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
                    required
                  />
                </Col>
              </Row>
              <div className="errorMsg">{this.state.errors.email}</div>
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
                    required
                  />
                </Col>
              </Row>
              <div className="errorMsg">{this.state.errors.password}</div>
              <Row justify={'center'}>
                <Col md={8}>
                  <TextField
                    id="firstName"
                    label="Nombre"
                    value={this.state.firstName}
                    onChange={(e) => this.handleChange(e)}
                    type="text"
                    className={'textField dense'}
                    margin="dense"
                    required
                  />
                </Col>
              </Row>
              <div className="errorMsg">{this.state.errors.firstName}</div>
              <Row justify={'center'}>
                <Col md={8}>
                  <TextField
                    id="lastName"
                    label="Apellido"
                    value={this.state.lastName}
                    className={'textField dense'}
                    onChange={(e) => this.handleChange(e)}
                    margin="dense"
                    required
                  />
                </Col>
              </Row>
              <div className="errorMsg">{this.state.errors.lastName}</div>
              <Row justify={'center'}>
                <Col md={8}>
                  <TextField
                    id="phoneNumber"
                    label="Número Telefónico (Opcional)"
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
                    label="Usuario de Twitter (Opcional) Ex.@danielcagua4"
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
                    label="Usuario de Facebook (Opcional)"
                    value={this.state.profileFB}
                    className='textField dense'
                    onChange={(e) => this.handleChange(e)}
                    margin="dense"
                  />
                </Col>
              </Row>
        
              <Button letiant="contained" size="large" color="primary" className={'button'} onClick={this.handleSubmit}>Crear Usuario</Button>
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
  Meteor.subscribe('users');
  return {
    users: Meteor.users.find({}).fetch()
  };
})(Register);