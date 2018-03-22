import React, { Component } from 'react';

class TaskForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.taskToEdit ? props.taskToEdit.title : '',
            task: props.taskToEdit ? props.taskToEdit.task : ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(e) {
        const name = e.target.name;
        const val = e.target.value;
        this.setState({
            [name]: val,
        });
    }

    render() {
        return (
            <div>
               <form onSubmit={this.props.isAdding 
                    ? e => this.props.handleTaskSubmit(e, 'POST', this.state)
                    : e => this.props.handleTaskSubmit(e, 'PUT', this.state, this.props.taskToEdit.id)} >
                   <label>Task:</label>
                   <input   type="text" 
                            onChange={this.handleInputChange} 
                            value={this.state.title}
                            name="title" />
                   <label>Task Description:</label>
                   <input   type="text" 
                            onChange={this.handleInputChange} 
                            value={this.state.text} 
                            name="task" />
                    <input type="submit" value="submit" />
                </form>                
            </div>
        );
    }
}

export default TaskForm;