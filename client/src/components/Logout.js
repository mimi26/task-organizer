import React, { Component } from 'react';
import axios from 'axios';

class Logout extends Component {
    constructor() {
        super();
        this.handleLogOutSubmit = this.handleLogOutSubmit.bind(this);
    }

    async handleLogOutSubmit(event) {
        event.preventDefault();
        try {
            const logout = await axios.post('http://localhost:3001/auth/logout'); 
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }
        catch (error) {
            console.log(error);
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleLogOutSubmit}>
                    <input type="submit" value="Log Out" />
                </form>
            </div>
        );
    }
}

export default Logout;