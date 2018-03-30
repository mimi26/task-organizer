import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//import Logout from './Logout';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: localStorage.getItem('id') ? localStorage.getItem('id') : '',
            userName: localStorage.getItem('user') ? localStorage.getItem('user') : ''
        }
    }

    componentDidMount() {
        this.getUser();
    }

    renderLogInOrWelcome() {
        if(this.state.userName) {
            return(
                <div>
                    <h1>Welcome Back {this.state.userName}!</h1>
                    <Link to={`/tasks/${this.state.userId}`}>Manage your tasks</Link>
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

    getUser() {
        this.setState({ 
            userId: localStorage.getItem('id'),
            userName: localStorage.getItem('user')
        });
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