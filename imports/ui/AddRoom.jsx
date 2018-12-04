import React, { Component } from 'react';
import {withTracker} from 'meteor/react-meteor-data';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Container, Row, Col } from 'react-grid-system';
import { Meteor } from 'meteor/meteor';
import request from 'superagent';
import '../styles/AddRoom.css';

class AddRoom extends Component {
  constructor(props){
    super(props);

    this.state = {
      completed:0,
      checkedItems: new Map(),
      titulo:'',
      descripcion:'',
      precio:'',
      tamano:'',
      sector:'',
      direccion:'',
      servicios:[],
      reglas:[],
      images:[]
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
      reglas:this.state.reglas,
      images:this.state.images
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

  onPhotoSelected(files) {
    const url = `https://api.cloudinary.com/v1_1/farappcloud/upload`;
    const title = this.state.titulo;
    let photoId=0;
    for (let file of files){
      const public_id = Date.now()
      photoId = this.photoId++;
      const fileName = file.name;
      request.post(url)
      .field('upload_preset', 'yduvzxlc')
      .field('file', file)
      .field('multiple', true)
      .field('public_id', public_id)
      .field('tags', title ? `myphotoalbum,${title}` : 'myphotoalbum')
      .field('context', title ? `photo=${title}` : '')
      .on('progress', (progress) => this.onPhotoUploadProgress(photoId,file.name, progress))
      .end((error, response) => {
        this.onPhotoUploaded(photoId, files.length, fileName, response);
      });
    }
}

onPhotoUploadProgress(id,fileName, progress) {
  console.log(id,progress.percent);
}

onPhotoUploaded(id,total, fileName, response) {
  let value;
  if(id==total){
    value=100;
  }
  else{
    value=this.state.completed + (1/total*100);
  }
  let newelement= response.body.public_id
  this.setState(prevState => ({
    images: [...prevState.images, newelement],
    completed: value
  }))
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
          <Col>
          <form action="">
          <Row justify={'center'} style={{width:'100%'}}>
              <TextField
          id="titulo"
          label="Titulo"
          className={'textField dense'}
          onChange={(e) => this.handleChange(e)}
          margin="dense"
          />
            </Row>
          <Row justify={'center'} style={{width:'100%'}}>
              <TextField
          id="descripcion"
          label="Descripcion"
          multiline
          rows="4"
          className={'textField'}
          onChange={(e) => this.handleChange(e)}
          />
            </Row>
          <Row justify={'center'} style={{width:'100%'}}>
                <TextField
                  id="precio"
                  label="Precio Mensual ($COP)"
                  value={this.state.precio}
                  onChange={(e) => this.handleChange(e)}
                  type="number"
                  className={'textField dense'}
                  margin="dense"
                  />
            </Row>
          <Row justify={'center'} style={{width:'100%'}}>
                <TextField
                  id="tamano"
                  label="Tamaño (m2)"
                  value={this.state.tamano}
                  onChange={(e) => this.handleChange(e)}
                  type="number"
                  className={'textField dense'}
                  margin="dense"
                  />
            </Row>
          <Row justify={'center'} style={{width:'100%'}}>
                <TextField
                  id="sector"
                  label="Sector"
                  className={'textField dense'}
                  onChange={(e) => this.handleChange(e)}
                  margin="dense"
                  />
            </Row>
          <Row justify={'center'} style={{width:'100%'}}>
                <TextField
                  id="direccion"
                  label="Direccion"
                  className={'textField dense'}
                  onChange={(e) => this.handleChange(e)}
                  margin="dense"
                  />
            </Row>
          <Row justify={'center'} style={{width:'100%'}}>
              <TextField
          id="reglas"
          label="Reglas"
          multiline
          rows="4"
          className={'textField'}
          onChange={(e) => this.handleChange(e)}
          />
            </Row>
          <Row justify={'center'} style={{width:'100%',marginTop : 20 , marginBottom:20}}> 
              <FormControl component="fieldset" className={'formControl'}>
                <FormLabel component="legend">Con que servicios cuenta?</FormLabel>
                <FormGroup row>
                  {services.map(item => (
                    <Col md={3} key={item}> 
                    <FormControlLabel
                    control={
                      <Checkbox onChange={this.handleCheckChange} checked={this.state.checkedItems.get(item.name)} value={item} />
                    }
                    label={item}
                    /></Col>
                    ))}
                </FormGroup>
              </FormControl>
            </Row>
            <Row>
              <Col md={3}>
                <input
                    accept="image/*"
                    className='input'
                    id="contained-button-file"
                    type="file"
                    multiple
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
                    Cargar Imagenes
                    </Button>
                </label>
                </Col>
                <Col>
                  <label>{this.state.completed.toFixed(0)}% </label>
                  <LinearProgress variant="determinate" value={this.state.completed} />
                </Col>
            </Row>
            <Row justify={'end'}>
              <Button variant="contained" size="large" color="primary" className={'button'} onClick={this.handleSubmit}>Publicar</Button>
            </Row>
          </form>
          </Col>
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