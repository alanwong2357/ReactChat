import React from 'react';
import { Component } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from 'react-bootstrap/Modal';

import "./Login.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      show: true,
    }
  }

  onLoginEntered = (e) => {
    e.preventDefault();
    this.setState({show: false});
    console.log(this.state.name);
    this.props.handleLogin(this.state.name);
    this.props.toggleShow();
  }

  onHide = (e) => {
    this.setState({show: false});
    this.props.toggleShow();
  };

  render() {
    return (
      <Modal show={this.state.show} onHide={e=>{this.onHide(e)}} className="login" onSubmit={e=>this.onLoginEntered(e)}>
        <Modal.Header closeButton>
          Enter a Username or Enter as an Anonymous User
        </Modal.Header>
        <Form style={{padding: ".5em 1.2em 0em 1.2em"}}>
        <Form.Group as={Row} controlId="formBasicEmail">
          <Form.Label column sm="2">Username:</Form.Label>
          <Col sm='10'>
            <Form.Control onChange={e => this.state.name = e.target.value} autoComplete="off" type="search" placeholder="Enter username" />
          </Col>
        </Form.Group>
        <Modal.Footer>
        <Button variant="primary" type="submit">
          Login
        </Button>
        </Modal.Footer>
        </Form>

      </Modal>
    );
  }
}

export default Login;
