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

    // getUserId() {
    //   this.setState({ user_id: localStorage.getItem('id') });
    // }

    handleInputChange(e) {
        const name = e.target.name;
        const val = e.target.value;
        this.setState({
            [name]: val,
        });
    }

    render() {
        return (
            <form onSubmit={this.props.isAdding 
                ? e => this.props.handleTaskSubmit(e, 'POST', this.state)
                : e => this.props.handleTaskSubmit(e, 'PUT', this.state, this.props.taskToEdit.id)}
                className="task-form">
                <input   type="text" 
                        onChange={this.handleInputChange} 
                        value={this.state.title}
                        name="title" 
                        placeholder="ADD A NEW TASK"
                        className="task-input"/>
                <input   type="text" 
                        onChange={this.handleInputChange} 
                        value={this.state.task} 
                        name="task" />
                <input  type="submit" 
                        value="submit"
                        style={{display:"none"}}/>
            </form>                
        );
    }
}

export default TaskForm;