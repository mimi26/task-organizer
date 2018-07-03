import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import TaskForm from './TaskForm';
import Logout from './Logout';

class TaskList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: localStorage.getItem('id') ? localStorage.getItem('id') : '',
            userName: localStorage.getItem('user') ? localStorage.getItem('user') : '',
            tasks: []
        }
        this.getTasks = this.getTasks.bind(this);
    }

    componentDidMount() {
        this.getTasks();
    }

    async getTasks() {
        let userId = parseInt(this.state.userId);
        if (userId) {
            try {
                let tasks = await axios(`/api/tasks/${userId}`);
                this.setState({ tasks: tasks.data });
            } catch (error) {
                console.log(error);
            }
        }
    }

    renderAddButtonOrForm() {
        if (this.state.userName) {
            if (this.props.isAdding) {
                return (
                    <TaskForm isAdding={this.props.isAdding}
                        taskToEdit={this.props.taskToEdit}
                        handleTaskSubmit={this.props.handleTaskSubmit} />
                );
            } else {
                return (
                    <button onClick={this.props.handleAddTask}>Add New Task</button>
                );
            }
        } else {
            return null;
        }
    }

    renderTaskOrEditForm() {
        if (this.props.taskToEdit) {
            return (
                <TaskForm isAdding={this.props.isAdding}
                    taskToEdit={this.props.taskToEdit}
                    handleTaskSubmit={this.props.handleTaskSubmit} />
            );
        } else if (this.state.tasks) {
            return (
                this.state.tasks.map(task => {
                        return (
                            <div key={task.id} className="task-container">
                                <div className="task-cell task-status">
                                    ON TIME
                                </div>
                                <div className="task-cell task-title">
                                    {task.title}
                                </div>
                                <div className="task-cell task-description">
                                    {task.task}
                                </div>
                                <div className="buttons">
                                    <button onClick={() => this.props.handleEdit(task)}>Edit Task</button>
                                    <button onClick={() => this.props.handleDelete(task.id)}>Delete Task</button>
                                </div>
                            </div>
                        );
                    })
            )
        } else {
            return null;
        }
    }

    render() {
        return (
            <div className="list-container">
                <div className="list-title">{this.state.userName}'S TO DO LIST</div>
                <div className="list-body-container">
                    <div className="task-headers">
                        <div className="header">Status</div>
                        <div className="header">Task</div>
                        <div className="header">Description</div>
                    </div>
                        {this.renderTaskOrEditForm()}
                        {this.renderAddButtonOrForm()}
                    
                    <Logout handleLogOutSubmit={this.props.handleLogOutSubmit} />
                    <Link to='/'>click here to return to home page</ Link>
                </div>
            </div>
        );
    }
}

export default TaskList;