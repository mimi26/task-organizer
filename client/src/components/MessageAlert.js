import React, { Component } from 'react';
import '../styles/Message.css';

class MessageAlert extends Component {
    render() {
        return (
            <div>
                <div className="message-alert">{this.props.messageAlert}</div>
            </div>
        );
    }
}

export default MessageAlert;