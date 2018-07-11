import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Register.css';

class RegisterForm extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            email: '',
            password_digest: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    submitForm(e) {
        this.props.handleRegisterSubmit(e, this.state);
        this.setState({
            username: '',
            email: '',
            password_digest: ''
        });
    }

    handleChange(e) {
        const name = e.target.name;
        const val = e.target.value;
        this.setState({
            [name]: val,
        });
    }
    render() {
        return (
            <div className="register-container">
                <h1 className="form-title">Register</h1>
                <form   onSubmit={(e) => this.submitForm(e)}
                        className="register-form">
                    <input  type="text" 
                            value={this.state.username} 
                            name="username"
                            onChange={this.handleChange}
                            placeholder="USERNAME" />
                    <input  type="email" 
                            value={this.state.email}
                            name="email" 
                            onChange={this.handleChange}
                            placeholder="EMAIL" />
                    <input  type="password" 
                            value={this.state.password_digest} 
                            name="password_digest"
                            onChange={this.handleChange}
                            placeholder="PASSWORD" />
                    <input  type="submit" 
                            value="Submit"
                            className="submit-button" />
                </form>
                <Link className="back-link" to='/'>BACK</ Link>
            </div>
        );
    }
}

export default RegisterForm;