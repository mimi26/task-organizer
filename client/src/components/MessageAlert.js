import React, { Component } from 'react';
import '../styles/Message.css';

class MessageAlert extends Component {
    render() {
        return (
            <div>
                <h1 className="message-alert">{this.props.messageAlert}</h1>
            </div>
        );
    }
}

export default MessageAlert;