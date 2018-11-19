import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {Meteor} from 'meteor/meteor';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Route} from 'react-router-dom';
import cl from 'cloudinary-core';

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: 'cover',
  },
};

function UserCard(props) {
  const clCore = new cl.Cloudinary({cloud_name: 'farappcloud'});
  const { classes } = props;
  let {
    id,
    profileImage,
    firstName,
    lastName,
    description,
    type,
    rooms
  }=props;
  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          component='img'
          alt='UserInfo'
          className={classes.media}
          height='140'
          image={clCore.url(profileImage ,{width: 240, crop: 'scale'})}
          title='UserInfo'
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            Dueño: {firstName} {lastName}
          </Typography>
          <Typography gutterBottom variant='h5' component='h5'>
            {type}
          </Typography>
          <Typography component='p'>
            {description}
          </Typography>
          <Typography gutterBottom variant='h5' component='h5'>
            {rooms}
          </Typography>
          
        </CardContent>
      </CardActionArea>
      <CardActions>
        {console.log(Meteor.user())} 
        {id!=Meteor.user()._id?
          <Button size='small' color='primary'
            onClick={() => {
              window.location.assign(`chatRoom/${id}`);}}
          >
          Contact
          </Button>:
          <Button size='small' color='primary'>
          Editar
          </Button>
        }
      </CardActions>
    </Card>
  );
}

UserCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserCard);