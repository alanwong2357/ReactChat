import { Component } from "react";
import React from "react";
import './ChatForm.css';

import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

// import io from "socket.io-client";

const lineHeight = 25;

class ChatForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			value: "",
			rows: 1,
			switchOn: true,
			text: ""
		}

		this.handleFormChange = this.handleFormChange.bind(this);
		this.onEnterPress = this.onEnterPress.bind(this);
		this.handleSwitch = this.handleSwitch.bind(this);

		console.log("Switch is ",this.state.switchOn);

	}

	handleFormChange(e) {
		const oldRows = e.target.rows;
		e.target.rows = 1;
		const newRows = ((e.target.scrollHeight)/lineHeight);
		if(newRows !== oldRows) {
			e.target.rows = Math.floor(newRows);
		}


		e.stopPropagation();
	}

	onEnterPress = (e) => {
		if(this.state.switchOn) {
		  if(e.keyCode === 13 && e.ctrlKey && e.shiftKey === false) {
		    e.preventDefault();
		    this.handleSubmit(e);
		    // this.myFormRef.submit();
		  }
		}
	}

	handleSwitch(e) {
		console.log("switch clicked");
		this.setState({ switchOn: !this.state.switchOn });
	}


	handleSubmit(e) {
		e.preventDefault();

		console.log("sent to onSend", this.state.value);
		this.props.handleFormSubmitted(this.state.value);

		this.setState({value: ""});
	}

	onChange(e) {
  	this.setState({value: e.target.value});
	}

	render() {
		return(
			<Container fluid>
					<Row className="justify-content-md-right no-gutters">
						<Col md={{ span: 11 }}>
							<div className="custom-control custom-switch" id="switchEnter">
								<input type="checkbox" className="custom-control-input" id="customSwitch1" onChange={this.handleSwitch} checked={this.state.switchOn}></input>
			  				<label className="custom-control-label" htmlFor="customSwitch1">Ctrl+Enter to Send Message</label>
							</div>
						</Col>
					</Row>
						<Form onChange={this.handleFormChange} onKeyDown={this.onEnterPress} onSubmit={e => this.handleSubmit(e)} ref={el => this.myFormRef = el} style={{lineHeight: `$lineHeight}px`}}>
							<Row className="fluid">
								<Col className="fluid" style={{paddingLeft: "0"}}>
									<Form.Group controlId="exampleForm.ControlTextarea1">
									<Form.Control className="chatbox" as="textarea" rows="1" placeholder="Type a message and Ctrl+Enter to Message." value={this.state.value} onChange={e=>this.onChange(e)}/>
									</Form.Group>
								</Col>
									<Button variant="primary" type="submit" className="no-gutters" style={{height:"100%"}}>
										Submit
									</Button>
							</Row>
						</Form>

			</Container>
		);
	}
}

export default ChatForm;
