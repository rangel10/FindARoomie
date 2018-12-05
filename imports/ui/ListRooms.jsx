import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Rooms } from '../api/rooms';
import Grid from '@material-ui/core/Grid';
import CardRoom from './CardRoom';
import { ReactiveVar } from 'meteor/reactive-var';

class ListRooms extends Component{
  constructor(props){
    super(props);

    this.handleScroll = this.handleScroll.bind(this);
  }

  handleScroll() {
    const windowHeight = 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight) {
      this.props.increaseLimit(6);
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  render() 
  {
    return (
      <div>
        <div className='scrollDiv'></div>
        <Grid container className='root' spacing={16}>
          <Grid item xs={12}>
            <Grid container justify='center' spacing={16}>
              {this.props.rooms.map(value => (
                <Grid key={value._id} item>
                  <CardRoom location={this.props.location} room={value}/>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
        <button onClick={() => this.props.increaseLimit(6)}>load more</button>
      </div>
    );
  }

}

ListRooms.propTypes ={
  rooms: PropTypes.array.isRequired
};

const limite = new ReactiveVar(10);

export default withTracker(() => 
{
  Meteor.subscribe('rooms',limite.get());
  return {
    rooms: Rooms.find({},{sort:{createdAt:-1},limite:limite.get()}).fetch(),
    increaseLimit: (n) => {limite.set(limite.get()+n);console.log('limite es',limite.get());},
  };
})(ListRooms);