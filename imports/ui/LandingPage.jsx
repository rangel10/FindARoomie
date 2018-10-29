import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Button from '@material-ui/core/Button';

import Card from '@material-ui/core/Card';

import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  icon: {
    marginRight: theme.spacing.unit * 2,
  },
  heroUnit: {
    backgroundColor: theme.palette.background.paper,
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4,
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`,
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 6,
  },
});


function Album(props) {
  const { classes } = props;
  
  function handleLogin(){
    window.location.assign('/login');
  }

  function handleRegister(){
    window.location.assign('/register');
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <div className={classes.heroUnit}>
          <div className={classes.heroContent}>
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Find a Roomie
            </Typography>
            <Typography variant="h6" align="center" color="textSecondary" paragraph>
              Looking for the perfect Roommate? The waiting time is over!, Find a Roomie is the website that
              helps you to meet new people to live with and have the best experiences in lovely places. 
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={16} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary" onClick={handleRegister}>
                    Register
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary" onClick={handleLogin}>
                    Log In
                  </Button>
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
        <div className={classNames(classes.layout, classes.cardGrid)}>
          {/* End hero unit */}
          <Typography component="h2" variant="h3" align="center" color="textPrimary" gutterBottom>
              Why Find my Roomie?
          </Typography><br/>
          <Grid container spacing={40}>
            
            <Grid item sm={6} md={4} lg={3}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image="https://www.bayareasystems.com/web/wp-content/uploads/2018/02/free.png" // eslint-disable-line max-len
                  title="Free"
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                      Free for Everyone!
                  </Typography>
                  <Typography>
                      Find a Roomie is a free App so everyone can join it, More people means more chances to find a Roomie 
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item sm={6} md={4} lg={3}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image="https://www.elegantthemes.com/blog/wp-content/uploads/2018/02/wordpress-theme-security.png" // eslint-disable-line max-len
                  title="Image title"
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                      Safe and Secure
                  </Typography>
                  <Typography>
                      All your contact information is kept private through our secure info system.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item sm={6} md={4} lg={3}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image="https://blueocean.ca/wp-content/uploads/2016/04/Call-Center-Employee-Experience-HR-WFM.png" // eslint-disable-line max-len
                  title="Experience"
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    Best Experience
                  </Typography>
                  <Typography>
                    Our team guarantees the best experience when it comes to finding a Roomie by means of the platform
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item sm={6} md={4} lg={3}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image="http://robohub.org/wp-content/uploads/2017/02/grid-AI.jpg" // eslint-disable-line max-len
                  title="AI"
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                      Find the perfect Roomie using AI! (Coming Soon)
                  </Typography>
                  <Typography>
                      Based on Watson Personality Insights Technology we can find you the perfect Roomie based on his/her personality!
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
        
          </Grid>
        </div>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Find a Roomie
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Developed by: Orlando Sabogal and Daniel Cagua
        </Typography>
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}

Album.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Album);