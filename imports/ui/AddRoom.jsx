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

class AddRoom extends Component {
  constructor(props){
    super(props);

    this.state = {
      checkedItems: new Map(),
      titulo:'',
      descripcion:'',
      precio:'',
      tamano:'',
      sector:'',
      direccion:'',
      servicios:[],
      reglas:[]
    };

    this.handleCheckChange = this.handleCheckChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleCheckChange(e){
    const item = e.target.value;
    const isChecked = e.target.checked;
    this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(item, isChecked) }));
  }

  handleSubmit(){
    let selected = []
    this.state.checkedItems.forEach((value,key) => {
      if(value){selected.push(key)}
    });
    console.log(selected);
    this.setState({
      servicios:selected
    })
    const newRoom = {
      owner:this.props.user.emails[0].address,
      titulo:this.state.titulo,
      descripcion:this.state.descripcion,
      precio:this.state.precio,
      tamano:this.state.tamano,
      sector:this.state.sector,
      direccion:this.state.direccion,
      servicios:selected,
      reglas:this.state.reglas
    };
    console.log('newRoom',newRoom);
    Meteor.call('rooms.addRoom',newRoom, function(err,result){
      if(err){console.log(err)}
      Meteor.call('users.pushRoom',newRoom.owner,result,function(err,result){
        if(err){console.log(err)}
          window.location.assign('/viewrooms')
        }
      )
    })
    
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  render() {
    const services=['Agua','Luz','Televisión','Internet','Aseo','Parqueadero','Gimnasio','Ascensor'];
    if(!Meteor.user()){
      return(<div><h3>Debes iniciar sesion</h3></div>);
    }
    else{
      return (
        <div className='root'> 
        <h1>Agregar Habitación</h1>
        <Container>
          <form action="">
          <Row justify={'center'}>
              <Col md={8}>
              <TextField
          id="titulo"
          label="Titulo"
          className={'textField dense'}
          onChange={(e) => this.handleChange(e)}
          margin="dense"
          />
              </Col>
            </Row>
            <Row justify={'center'}>
              <Col md={8}>
              <TextField
          id="descripcion"
          label="Descripcion"
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
                  id="precio"
                  label="Precio Mensual ($COP)"
                  value={this.state.precio}
                  onChange={(e) => this.handleChange(e)}
                  type="number"
                  className={'textField dense'}
                  margin="dense"
                  />
              </Col>
            </Row>
            <Row justify={'center'}>
              <Col md={8}>
                <TextField
                  id="tamano"
                  label="Tamaño (m2)"
                  value={this.state.tamano}
                  onChange={(e) => this.handleChange(e)}
                  type="number"
                  className={'textField dense'}
                  margin="dense"
                  />
              </Col>
            </Row>
            <Row justify={'center'}>
              <Col md={8}>
                <TextField
                  id="sector"
                  label="Sector"
                  className={'textField dense'}
                  onChange={(e) => this.handleChange(e)}
                  margin="dense"
                  />
              </Col>
            </Row>
            <Row justify={'center'}>
              <Col md={8}>
                <TextField
                  id="direccion"
                  label="Direccion"
                  className={'textField dense'}
                  onChange={(e) => this.handleChange(e)}
                  margin="dense"
                  />
              </Col>
            </Row>
            <Row justify={'center'}>
              <Col md={8}>
              <TextField
          id="reglas"
          label="Reglas"
          multiline
          rows="4"
          className={'textField'}
          onChange={(e) => this.handleChange(e)}
          />
              </Col>
            </Row>
            <Row>
            <FormControl component="fieldset" className={'formControl'}>
          <FormLabel component="legend">Con que servicios cuenta?</FormLabel>
          <FormGroup>
            {services.map(item => (
              <FormControlLabel
              key={item}
              control={
                <Checkbox onChange={this.handleCheckChange} checked={this.state.checkedItems.get(item.name)} value={item} />
              }
              label={item}
              />
              ))}
          </FormGroup>
        </FormControl>
            </Row>
            <Button variant="contained" size="large" color="primary" className={'button'} onClick={this.handleSubmit}>Ofrecer</Button>
          </form>
        </Container>
      </div>
    );
  }
  }
}

export default withTracker(() => {
  Meteor.subscribe('user');
  Meteor.subscribe('rooms');
  return {
    user: Meteor.user()
  };
})(AddRoom);