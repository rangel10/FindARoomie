import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { ChatRooms } from '../api/chatRoom';
import { Container, Row, Col } from 'react-grid-system';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import SendRounded from '@material-ui/icons/SendRounded';
import '../styles/ChatRoom.css';

class ChatRoom extends Component {
  constructor(props){
    super(props);

    this.state = {
      sendMessage:''
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  handleSend = () =>{
    let user1 = this.props.user1._id;
    let user2;
    if(user1===this.props.chatRoom.user1){
      user2=this.props.chatRoom.user2;
    }
    else{
      user2=this.props.chatRoom.user1;
    }
    console.log(this.state.sendMessage,this.props.user1._id,this.props.chatRoom.user2);
    Meteor.call('chatrooms.sendMessage',this.state.sendMessage,user1,user2);
    this.setState({sendMessage:''});
  }

  renderMessages(){
    return(
      <Col>
        <Paper style={{height: '80vh', overflowY: 'auto', overflowX:'hidden'}}>
          {this.props.chatRoom !== undefined ? this.props.chatRoom.messages.map(m => (
            <Row justify={m.user===this.props.user1._id?'end':'start'} key={m.time}>
              <div className={`talk-bubble tri-right ${m.user===this.props.user1._id?'me right':'other left'}-top`}>
                <div className="talktext">
                  <p>{m.text}</p>
                </div>
              </div>
            </Row>
          )):<div></div>}
        </Paper>
        <Row>
          <Input
            id="sendMessage"
            type='text'
            value={this.state.sendMessage}
            onChange={(e) => this.handleChange(e)}
            onKeyPress={(e) => {if(e.key==='Enter'){this.handleSend();}}}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="Toggle password visibility"
                  onClick={this.handleSend}
                >
                  <SendRounded/>
                </IconButton>
              </InputAdornment>
            }
          />
        </Row>
      </Col>
    );
  }

  render() {
    return (
      <Col>
        <Row>
          {this.props.chatRoom!==null ? this.renderMessages():<div></div>}
        </Row>
      </Col>
    );
  }
}

export default  withTracker(() => {
  Meteor.subscribe('chatrooms');
  return {
    user1: Meteor.user()
  };
}) (ChatRoom);