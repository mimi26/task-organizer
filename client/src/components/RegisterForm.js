import React, { Component } from 'react';

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
            <div>
                <h1>Register:</h1>
                <form onSubmit={(e) => this.submitForm(e)}>
                    <label>Username:</label>
                    <input  type="text" 
                            value={this.state.username} 
                            name="username"
                            onChange={this.handleChange} />
                    <label>Email:</label>
                    <input  type="email" 
                            value={this.state.email}
                            name="email" 
                            onChange={this.handleChange} />
                    <label>Password:</label>
                    <input  type="password" 
                            value={this.state.password_digest} 
                            name="password_digest"
                            onChange={this.handleChange} />
                    <input type="submit" value="Submit"/>
                </form>

            </div>
        );
    }
}

export default RegisterForm;