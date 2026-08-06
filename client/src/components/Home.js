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


    render() {
        return (
            <div className="home-container">
                <div className="ticket-container">
                    <div>
                        <Link to='/register' ><img src={register} className="ticket"/></Link>
                    </div>
                    <div>
                        <Link to='/login' ><img src={login} className="ticket"/></Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;