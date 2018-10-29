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

  render() {
    const {ownerRoom,room} = this.state;

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
                firstName={ownerRoom.username}
                lastName={ownerRoom.username}
                description={ownerRoom.lastName}
                type={ownerRoom.type}
                rooms={ownerRoom.rooms}
              />
            </Col>
            <Col md={8}>
              <Row>
                <Paper className={'root margin'} elevation={1}>
                  <Typography variant="h5" component="h3">
                    This is a sheet of paper.
                  </Typography>
                  <Typography component="p">
                    Paper can be used to build surface or other elements for your application.
                  </Typography>
                </Paper>
              </Row>
            </Col>
          </Row>
        </Container>

      </div>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('users');
  Meteor.subscribe('rooms');
  return {
    user: Meteor.user(),
  };
})(RoomView);