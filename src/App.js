import React from 'react';
import { Component } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './App.css';
import ChatForm from "./chatForm/ChatForm.js";
import Messages from "./messages/Messages.js";
import Sidebar from "./sidebar/Sidebar.js";
import Login from "./login/Login.js";

import io from "socket.io-client";
// import openSocket from 'socket.io-client';
  // "comment_server": "nodemon Server/index.js",

let socket;

class App extends Component {
  constructor() {
    super();

      this.state = {

        chatrooms: new Map([
          ['general', {
              messages: [
              {
                text: "This is a test message!",
                member: {
                  color: "blue",
                  username: "bluemoon"
                }
              },
              {
                text: "This is a test message! 2",
                member: {
                  color: "red",
                  username: "redmoon"
                }
              }
            ],
            }
          ],
          ['random', {
              messages: [
              {
                text: "This is a test message in the #random chatroom!",
                member: {
                  color: "blue",
                  username: "randomname"
                }
              },
              {
                text: "This is a test message! 2 in #random",
                member: {
                  color: "red",
                  username: "secondmoon"
                }
              }
            ],
            }
          ],
        ]),
        member: {
          username: randomName(),
          color: randomColor()
        },

        currentChatRoom: "general",
        showLogin: true,
        users: [],
        showName: false,
        currentUser: "",
      };
  }

  componentWillMount() {
    if(!socket) {
      socket = io('http://localhost:3001/');

      socket.on('connect', ()=> {
        console.log("Connected");
      });

    }
  }

  componentDidMount() {
    socket.on('chat message', (msg) => {
      console.log("from the socket:", msg);
      console.log(msg);
      this.onSend(msg);
    });

    let keys =[ ...this.state.chatrooms.keys() ];
    console.log("app.js keys- ",keys);
  }


  onSend = ({message, member}) => {
    var newMessages = this.state.chatrooms;
    console.log("ONSEND is",message,member);
    newMessages.get(this.state.currentChatRoom).messages.push({
      text: message,
      member: member
    });

    this.setState({chatrooms: newMessages});
    // this.scrollToBottom();
  }

  // dont actually need this to scroll chat, in messages.js componentWillUpdate
  // scrollToBottom() {
  //   this.el.scrollIntoView(true);
  //   this.el.scrollIntoView({ behavior: 'smooth' });
  // }

  handleFormSubmitted = (msg) => {
    // console.log("app.js the user is ", this.state.member.username);
    socket.emit('chat message', {message: msg, member: this.state.member});
  }

  onChatroomChange = (room) => {
    this.setState({currentChatRoom: room});
  }

  handleLogin = (name) => {
    let currMember = this.state.member;
    currMember.username = name
    this.setState({member: currMember});
  }

  toggleShow = () => {
    this.setState({showName: !this.state.showName});
  }

  render() {
    return (
      <Container  className="no-gutters">
        <Login
          currentMember={this.state.member.username}
          handleLogin={this.handleLogin}
          toggleShow={this.toggleShow}/>
        <Row className="App-header fluid no-gutters">
          {this.state.showName ? <Col md={2} xs={1}><p style={{left: "0", paddingLeft: "0em", backgroundColor:"rgb(13,33,70)", height: "10vh", paddingTop: "1.5rem", textAlign: "center"}}>{this.state.member.username}</p></Col> : null}
          <Col md={8} xs={8}>
            <p className="title {this.state.showName ? offset ? null}" style={{textAlign: "center"}}>
              #{this.state.currentChatRoom}
            </p>
          </Col>
          <Col md={2} xs={2}>
            <p className="offset" style={{textAlign: "left"}}>
              Users: {this.state.users.length}
            </p>
          </Col>
        </Row>
        <Row noGutters={true}>
          <Col md={2} xs={4} >
            <Sidebar
              chatrooms={this.state.chatrooms}
              onChatroomChange={this.onChatroomChange}
              currentChatRoom={this.state.currentChatRoom}
              showName={this.state.showName}
              currentMember={this.state.member.username}/>
          </Col>
          <Col className="App" md={10} xs={6} style={{height: '92vh'}}>
            <Messages
              messages={this.state.chatrooms.get(this.state.currentChatRoom).messages}
              currentMember= {this.state.member}
            />
            <ChatForm className="footer"
              onSend={this.onSend}
              handleFormSubmitted={this.handleFormSubmitted}/>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
