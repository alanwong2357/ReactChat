import React from 'react';
import { Component } from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import './Sidebar.css';

class Sidebar extends Component {
	constructor(props) {
		super(props);

		this.state = {
			selected: "general",
		}

		this.handleChatroomChange = this.handleChatroomChange.bind(this);
	}

	handleChatroomChange = (e) => {
		console.log(e.target.innerText.substring(1));
		this.props.onChatroomChange(e.target.innerText.substring(1));
	}

	render() {
		const arrmap = [ ...this.props.chatrooms.keys() ];
		return (
			<div className="sidebar">
				<h2>Chatrooms</h2>
				<h3>{arrmap.map(chatroom =>
					this.props.currentChatRoom == chatroom ?
						<li className="chatrooms ({this.props.currentChatRoom == chatroom.toString() ? selectedChatroom : {}})" onClick={e => this.handleChatroomChange(e)} style= {{listStyleType: "none"}}>
							#{chatroom}
						</li>
					:
					 <li className="chatrooms" onClick={e => this.handleChatroomChange(e)} style= {{listStyleType: "none"}}>
							#{chatroom}
						</li>

				)}</h3>
			</div>
		)
	}
}

export default Sidebar;
