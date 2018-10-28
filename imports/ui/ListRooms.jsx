import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Rooms } from '../api/rooms';
import Grid from '@material-ui/core/Grid';
import CardRoom from './CardRoom';

export class ListRooms extends Component
{
  render() 
  {
    return (
      <div>
        <Grid container className='root' spacing={16}>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={16}>
              {this.props.rooms.map(value => (
                <Grid key={value._id} item>
                  <CardRoom room={value}/>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }

}

ListRooms.propTypes ={
  rooms: PropTypes.array.isRequired
};

export default withTracker(() => 
{
  Meteor.subscribe('rooms');
  return {
    rooms: Rooms.find({}).fetch()
  };
})(ListRooms);