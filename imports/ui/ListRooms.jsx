import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Rooms } from '../api/rooms';
import Grid from '@material-ui/core/Grid';
import CardRoom from './CardRoom';

class ListRooms extends Component{
  constructor(props){
    super(props);

    this.state = {
      message:'not at bottom'
    };
    this.handleScroll = this.handleScroll.bind(this);
  }

  handleScroll() {
    const windowHeight = 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight) {
      this.setState({
        message:'bottom reached'
      });
    } else {
      this.setState({
        message:'not at bottom'
      });
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
        <div className='fixedDiv'>{this.state.message}</div>
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
      </div>
    );
  }

}

ListRooms.propTypes ={
  rooms: PropTypes.array.isRequired
};

export default withTracker(({limit}) => 
{
  Meteor.subscribe('rooms',limit);
  return {
    rooms: Rooms.find({}).fetch()
  };
})(ListRooms);