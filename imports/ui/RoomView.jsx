import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import {withTracker} from 'meteor/react-meteor-data';
import { Rooms } from '../api/rooms';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { Container, Row, Col } from 'react-grid-system';
import UserCard from './UserCard';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import '../styles/RoomView.css';

class RoomView extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      room:'',
      ownerRoom:''
    };
  }
  
  
  componentDidMount(){
    if(this.state.room == ''){
      console.log('montado',this.props.match.params.roomId);
      const id = this.props.match.params.roomId;
      Meteor.call('rooms.getRoom',id, function(error,result){
        if(error){
          alert('Error getRoom');
        }else{
          this.setState({
            room: result[0]
          });
          //console.log(this.state.room.owner);
          Meteor.call('users.findByUsername',this.state.room.owner,function(error,result){
            if(error){
              alert('Error getUser');
            }else{
              //console.log(result[0]);
              this.setState({
                ownerRoom: result[0]
              });
            }
          }.bind(this));
        }
      }.bind(this));
      
    }
  }
  
  
  
  renderRoomData(r){
    return(
      <Col md={8}>
        <Row>
          <Paper className={'root margin'} elevation={1}>
            <Typography variant="h5">
      Descripcion
            </Typography>
            <Typography component="p">
              {r.descripcion}
            </Typography>
          </Paper>
        </Row>
        <Row>
          <Paper className={'root margin'} elevation={1}>
            <Typography variant="h5">
      Precio
            </Typography>
            <Typography component="p">
              {r.precio}
            </Typography>
          </Paper>
        </Row>
        <Row>
          <Paper className={'root margin'} elevation={1}>
            <Typography variant="h5">
      Sector
            </Typography>
            <Typography component="p">
              {r.sector}
            </Typography>
          </Paper>
        </Row>
        <Row>
          <Paper className={'root margin'} elevation={1}>
            <Typography variant="h5">
      Servicios
            </Typography>
            <ul>
              {r.servicios.map(p => {
                return(<li key={p}><Typography component="p">{p}</Typography></li>);
              }) }
            </ul>
          </Paper>
          <Paper className={'root margin'} elevation={1}>
            <Typography variant="h5">
      Reglas
            </Typography>
            <ul>
              {r.reglas.split('\n').map(p => {
                return(<li key={p}><Typography component="p">{p}</Typography></li>);
              }) }
            </ul>
          </Paper>
        </Row>
      </Col>
    );
  }
    
  render() {
    const {room,ownerRoom} = this.state;
    if(room!=undefined && ownerRoom.hasOwnProperty('_id')){
      console.log(ownerRoom);
      return (
        <div className='container'>
          <Container spacing={24} style={{'marginLeft':0 ,'marginRight':0}}>
            <Row justify={'center'}>
              <div className={'margin'}>
                <Typography variant="h2">
                  {this.state.room.titulo}
                </Typography>
              </div>
            </Row>
            <Row justify={'between'}>
              <Col md={4}>
                <UserCard
                  profileImage='https://static.thenounproject.com/png/17241-200.png'
                  firstName={ownerRoom.profile.firstName}
                  lastName={ownerRoom.profile.lastName}
                  description={ownerRoom.lastName}
                  type={ownerRoom.type}
                  rooms={ownerRoom.rooms}
                />
              </Col>
              {this.renderRoomData(room)}
            </Row>
          </Container>
          
        </div>
      );
    }
    else{
      return(<div></div>);
    }
  }
}
    
export default withTracker(() => {
  Meteor.subscribe('users');
  Meteor.subscribe('rooms');
  return {
    user: Meteor.user(),
  };
})(RoomView);