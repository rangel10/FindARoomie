import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    maxWidth: 400,
  },
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: 'cover',
  },
};

function ImgMediaCard(props) {
  const { classes } = props;
  // Falta Añadir Atributos para manejarlos con Props
  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="AvailableRoom"
          className={classes.media}
          height="140"
          image="https://c1.staticflickr.com/5/4143/4745662296_ae5c16f427_b.jpg" // La idea es cargar el link de flickr asociado a cada apartamento
          title="AvailableRoom"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            NY Apartment
          </Typography>
          <Typography gutterBottom variant="h5" component="h5">
            Owner: Camilo la Maleza
          </Typography>
          <Typography component="p">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent tincidunt et lectus euismod pharetra. Praesent malesuada massa id sapien molestie aliquet. Cras lectus ligula, maximus sed placerat nec, elementum gravida nisl. Morbi tincidunt, est et laoreet finibus, risus ante posuere purus, ut maximus nisi lectus ut enim. Aenean vitae porttitor tortor. Ut tincidunt enim eleifend interdum faucibus. Pellentesque accumsan malesuada nunc, eu tempus massa vulputate nec. Fusce vestibulum pulvinar sodales.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          More Info
        </Button>
        <Button size="small" color="primary">
          Start Chat
        </Button>
      </CardActions>
    </Card>
  );
}

ImgMediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImgMediaCard);