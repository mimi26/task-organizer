import React, { Component } from 'react';
import axios from 'axios';

import TaskForm from './TaskForm';

class TaskList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: localStorage.getItem('id') ? localStorage.getItem('id') : '',
            userName: localStorage.getItem('user') ? localStorage.getItem('user') : '',
            tasks: [],
            crossedOut: [],
            hideCrossedOut: false
        }
        this.getTasks = this.getTasks.bind(this);
        this.handleTaskClick = this.handleTaskClick.bind(this);
        this.renderStatus = this.renderStatus.bind(this);
        this.handleHideClick = this.handleHideClick.bind(this);
    }

    componentDidMount() {
        this.getTasks();
    }

    async getTasks() {
        let userId = parseInt(this.state.userId);
        if (userId) {
            try {
                let tasks = await axios(`/api/tasks/${userId}`);
                this.setState({ 
                    tasks: tasks.data,
                    crossedOut: tasks.data.map(task => false)
                });
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

    handleTaskClick(index) {      
        const newCrossedOut = [...this.state.crossedOut];
        newCrossedOut[index] = !this.state.crossedOut[index];
        this.setState({ crossedOut: newCrossedOut });
    }

    renderStatus(index) {
        if (this.state.crossedOut[index]) {
            return 'CROSSED OUT';
        } else {
            return 'ON TIME';
        }
    }

    handleHideClick() {
        const newhideCrossedOut = !this.state.hideCrossedOut;
        this.setState({ hideCrossedOut: newhideCrossedOut });
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
                this.state.tasks.map((task, index) => {
                    let className = this.state.crossedOut[index] ? 'task-text' : null;
                    let containerClass = this.state.hideCrossedOut && this.state.crossedOut[index] 
                                        ? 'crossed-out-hide'
                                        : 'task-container';
                        return (
                            <div    key={task.id} 
                                    className={containerClass}
                                    onClick={() => this.handleTaskClick(index)}>
                                <div className="task-cell task-status">
                                    <span className={className}>{this.renderStatus(index)}</span>
                                </div>
                                <div className="task-cell task-title">
                                    <span className={className}>{task.title}</span>
                                </div>
                                <div className="task-cell task-description">
                                    <span className={className}>{task.task}</span>
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
                    <div>
                        <div className="task-headers">
                            <div className="header">Status</div>
                            <div className="header">Task</div>
                            <div className="header">Description</div>
                        </div>
                        {this.renderTaskOrEditForm()}
                        {this.renderAddButtonOrForm()}
                    </div>
                    <div className="bottom-container">
                        <p
                            className="show-crossed-off"
                            onClick={this.handleHideClick}>
                                HIDE CROSSED OFF
                        </p>
                        <p
                            className="log-out" 
                            onClick={this.props.handleLogOutSubmit}>
                                LOG OUT
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default TaskList;