import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
    render() {
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

export default Home;