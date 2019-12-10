import { Component } from "react";
import React from "react";

class Messages extends Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    this.el.scrollIntoView({ behavior: 'smooth' });
  }

	render() {
		const {messages} = this.props;
    console.log(messages);
		return(
			<ul className="Messages-list">
        {this.props.messages && messages.map(m => this.renderMessage(m))}
      </ul>
	  );
	}

	renderMessage(message) {
    const {member, text} = message;
    const {currentMember} = this.props;
    console.log(this.props);
    const messageFromMe = member.username === currentMember.username;
    const fromUser = messageFromMe ?
      "Messages-message currentMember" : "Messages-message";

    return (
      <li className={fromUser}>
      <span
        className="avatar"
        style={{backgroundColor: member.color}}
      />
        <div className="Message-content">
          <div className="username">
            {member.username}
          </div>
          <div className="text">{text}</div>
        </div>
        <div ref={el => { this.el = el; }} />
      </li>
    );
  }
}

export default Messages;
