import React, { Component } from 'react';

class Logout extends Component {

    render() {
        return (
            <div>
                <form onSubmit={this.props.handleLogOutSubmit}>
                    <input type="submit" value="Log Out" />
                </form>
            </div>
        );
    }
}

export default Logout;