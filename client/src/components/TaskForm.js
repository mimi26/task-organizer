import React, { Component } from 'react';

class TaskForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.taskToEdit ? props.taskToEdit.title : '',
            task: props.taskToEdit ? props.taskToEdit.task : '',
            displayState: 'none'
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(e) {
        const name = e.target.name;
        const val = e.target.value;
        this.setState({
            [name]: val
        });
        if (e.target.value === '') {
            this.setState({ displayState: 'none' });
        } else {
            this.setState({ displayState: 'inline-block' });
        }
    }

    render() {
        return (
            <form onSubmit={this.props.isAdding 
                ? e => this.props.handleTaskSubmit(e, 'POST', this.state)
                : e => this.props.handleTaskSubmit(e, 'PUT', this.state, this.props.taskToEdit.id)}
                className="task-form">
                <input  type="text" 
                        onChange={this.handleInputChange}
                        value={this.state.title}
                        name="title" 
                        placeholder="ADD A NEW TASK"
                        className="task-input-text"/>
                <input  type="text" 
                        onChange={this.handleInputChange} 
                        value={this.state.task} 
                        name="task" 
                        placeholder="ADD A NEW TASK DESCRIPTION"
                        className="task-input-description"
                        style={{display:`${this.state.displayState}`}} />
                <input  type="submit" 
                        value="submit"
                        style={{display:'none'}}/>
            </form>                
        );
    }
}

export default TaskForm;

//glitch in the matrix dot com