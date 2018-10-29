import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import {withTracker} from 'meteor/react-meteor-data';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {withRouter, Switch, Route, Link, Redirect} from 'react-router-dom';

class UserCard extends Component {
  
  render(){
    return (
      <div>
      <Card className="card">
      <CardActionArea>
      <CardMedia
      component="img"
      alt="UserInfo"
      height="140"
      weight="200"
      image='https://static.thenounproject.com/png/17241-200.png'
      title="UserInfo"
      />
      <CardContent>
      <Typography gutterBottom variant="h5" component="h2">
      User: {this.props.user.firstName} {this.props.user.lastName}
      </Typography>
      <Typography gutterBottom variant="h5" component="h5">
      {this.props.user.type}
      </Typography>
      <Typography component="p">
      {this.props.user.description}
      </Typography>
      <Typography gutterBottom variant="h5" component="h5">
      {this.props.user.rooms}
      </Typography>
      
      </CardContent>
      </CardActionArea>
      <CardActions>
      <Button size="small" color="primary">
      Contact
      </Button>
      </CardActions>
      </Card>
      </div>
      );
    }
  }
  
  export default withTracker(() => {
    Meteor.subscribe('users');
    return {
      user: Meteor.user()
    };
  })(UserCard);