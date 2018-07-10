import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';
import register from '../styles/assets/register.png';
import login from '../styles/assets/login.png';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: localStorage.getItem('id') ? localStorage.getItem('id') : '',
            userName: localStorage.getItem('user') ? localStorage.getItem('user') : ''
        }
    }

    // renderLogInOrWelcome() {
    //     if(this.state.userName) {
    //         return(
    //             <div>
    //                 <h1>Welcome Back {this.state.userName}!</h1>
    //                 <Link to={`/tasks/${this.state.userId}`}>Manage your tasks</Link>
    //                 <Logout handleLogOutSubmit={this.props.handleLogOutSubmit} />
    //             </div>
    //         );
    //     } else {
    //         return (
    //             <div>
    //                 <h1>To manage your tasks, please
    //                     <Link to='/login'> log in:</Link>
    //                 </h1>
    //                 <h1>Or to get started, please
    //                     <Link to='/register'> register:</Link>
    //                 </h1>
    //             </div>
    //         );
    //     }
    // }

    render() {
        return (
            <div className="home-container">
                <div className="ticket-container">
                    <Link to='/login'><img src={register} /></Link>
                    <Link to='/register'><img src={login} /></Link>
                </div>
            </div>
        );
    }
}

export default Home;