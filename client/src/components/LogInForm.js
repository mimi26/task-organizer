import React, { Component } from 'react';

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
                <h1>Log In:</h1>
                <form onSubmit={(e) => this.submitForm(e)}>
                    <label>Username:</label>
                    <input type="text"
                        value={this.state.username}
                        name="username"
                        onChange={this.handleChange} />
                    <label>Password:</label>
                    <input type="password"
                        value={this.state.password}
                        name="password"
                        onChange={this.handleChange} />
                    <input type="submit" value="Submit" />
                </form>
                
            </div>
        );
    }
}

export default LogInForm;