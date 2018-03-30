import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//import Logout from './Logout';

class Home extends Component {

    renderLogInOrWelcome() {
        if(this.props.currentUserName) {
            return(
                <div>
                    <h1>Welcome Back {this.props.currentUserName}!</h1>
                    <Link to={`/tasks/${this.props.currentUserId}`}>Manage your tasks</Link>
                    {/* <Logout /> */}
                </div>
            );
        } else {
            return (
                <div>
                    <h1>To manage your tasks, please
                        <Link to='/login'> log in:</Link>
                    </h1>
                    <h1>Or to get started, please
                        <Link to='/register'> register:</Link>
                    </h1>
                </div>
            );
        }
    }
    render() {
        return (
            <div>
                {this.renderLogInOrWelcome()}
            </div>
        );
    }
}

export default Home;