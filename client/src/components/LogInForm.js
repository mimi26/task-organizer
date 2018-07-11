import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Register.css';


class LogInForm extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    submitForm(e) {
        this.props.handleLogInSubmit(e, this.state);
        this.setState({
            username: '',
            email: '',
            password: ''
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
                <h1 className="form-title">Log In:</h1>
                <form   onSubmit={(e) => this.submitForm(e)}
                        className="register-form login-form">
                    {/* <label>Username:</label> */}
                    <input type="text"
                        value={this.state.username}
                        name="username"
                        onChange={this.handleChange} 
                        placeholder="USERNAME" />
                    {/* <label>Password:</label> */}
                    <input type="password"
                        value={this.state.password}
                        name="password"
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

export default LogInForm;