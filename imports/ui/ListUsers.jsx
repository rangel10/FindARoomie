import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import UserCard from './UserCard.jsx';
import PropTypes from 'prop-types';

import { Container, Row, Col } from 'react-grid-system';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

export class ListUsers extends Component
{
  constructor(props){
    super(props);
    this.state={
      users:''
    };
  }

  componentDidMount()
  {
    if (this.state.user=='')
    {
      console.log('Mount')
      Meteor.call('users.findAll', function (err,res){
        if(err)
        {
          alert('Error: Getting All Users')
        }
        else
        {
          this.setState({
            users: res
          });
        }
      }.bind(this));
  }
  
}
    render() 
    { 
      const {users} = this.state;
      
      return this.props.users.map((user)=>
      {
        let descr = "Hi! Im a user!";
        return (
          <div className='container'>
          <Container spacing={24} style={{'marginLeft':0 ,'marginRight':0}}>
          <Row justify={'between'}>
          <Col md={4}>
          <UserCard
          
          profileImage='https://static.thenounproject.com/png/17241-200.png'
          firstName={user.firstName}
          lastName={user.lastName}
          description={descr}
          type={user.type}
          rooms={user.rooms}
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
      })      
    }
}

ListUsers.propTypes={
  users: PropTypes.array.isRequired
}

export default withTracker(() => 
{
    Meteor.subscribe("users");
    console.log(Meteor.users.find({}).fetch());
    return {
      users: Meteor.users.find({}).fetch()
    };
    
})(ListUsers);