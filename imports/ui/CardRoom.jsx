import React, { Component } from 'react';
import {Meteor} from 'meteor/meteor';
import {withTracker} from 'meteor/react-meteor-data';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import '../styles/CardRoom';

class CardRoom extends Component {


  render() {
    
    const {match} = this.props;
    return (

      <div>
        <Card className='card'>
          <CardHeader
            title={this.props.room.titulo}
            subheader={`Precio: $${this.props.room.precio}`}
          />
          <CardMedia 
            className='media'
            image={'/images/defaultRoom.jpg'}
          />
          <CardActions className='actions'>
            <Button href={`viewrooms/${this.props.room._id}`}>Ver Habitación</Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('userData');
  Meteor.subscribe('rooms');
  return {
    user: Meteor.user()
  };
})(CardRoom);