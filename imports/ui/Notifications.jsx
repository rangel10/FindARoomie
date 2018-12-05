import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { ChatRooms } from '../api/chatRoom';
import { Container, Row, Col } from 'react-grid-system';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import ChatRoom from './ChatRoom';

class  Notifications extends Component {
  constructor(props){
    super(props);

    this.state = {
      currentChat:0
    };
  }

  handleListItemClick = (event, index) => {
    this.setState({ currentChat: index });
  };

  async getName(c){
    let r = '';
    await Meteor.call('users.getNameByID',c.user2,(err,res) => {
      if(err){console.log(err);}
      console.log(res);
      r += res;
    });
    console.log(r);
    return r;
  }

  render() {
    return ( this.props.loading ? <div></div> :
      <div>
        <Row>
          <Col md={3}>
            <List className='root'>
              {this.props.chatRooms !== undefined ? this.props.chatRooms.map((c,i) => 
                <ListItem 
                key={i}
                button
                selected={this.state.currentChat === i}
                onClick={event => this.handleListItemClick(event, i)}
                >
                <Avatar>
                  <ImageIcon />
                </Avatar>
                <ListItemText primary={c.user2} secondary="Jan 9, 2014" />
              </ListItem>
              ):
              <ListItem>
                <Avatar>
                  <ImageIcon />
                </Avatar>
                <ListItemText primary="No hay chats" />
              </ListItem>
              }
            </List>
          </Col>
          <Col md={8}>
            <ChatRoom chatRoom={this.props.chatRooms[this.state.currentChat]}/>
          </Col>
        </Row>
      </div>
    );
  }
}

export default withTracker(() => {
  const handle = Meteor.subscribe('chatrooms');
  Meteor.subscribe('users');
  console.log(Meteor.userId());
  return {
    loading:!handle.ready(),
    chatRooms: ChatRooms.find(
      {$or: [
        { user1: Meteor.userId() },
        { user2: Meteor.userId()},
      ]
      }).fetch(),
    user1: Meteor.user()
  };
}) (Notifications);