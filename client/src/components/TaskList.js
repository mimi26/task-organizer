import React, { Component } from 'react';
import axios from 'axios';

import TaskForm from './TaskForm';
import Task from './Task';

class TaskList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: localStorage.getItem('id') ? localStorage.getItem('id') : '',
            userName: localStorage.getItem('user') ? localStorage.getItem('user') : '',
            tasks: [],
            hideCrossedOut: false,
            revealOrHide: 'HIDE'
        }

        this.getTasks = this.getTasks.bind(this);
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
                    tasks: tasks.data
                });
            } catch (error) {
                console.log(error);
            }
        }
    }

    // renderAddButtonOrForm() {
    //     if (this.state.userName) {
    //         if (this.props.isAdding) {
    //             return (
    //                 <TaskForm isAdding={this.props.isAdding}
    //                     taskToEdit={this.props.taskToEdit}
    //                     handleTaskSubmit={this.props.handleTaskSubmit} />
    //             );
    //         } else {
    //             return (
    //                 <button onClick={this.props.handleAddTask}>Add New Task</button>
    //             );
    //         }
    //     } else {
    //         return null;
    //     }
    // }

    handleHideClick() {
        const newhideCrossedOut = !this.state.hideCrossedOut;
        let newRevealOrHide;
        if (this.state.revealOrHide === 'HIDE') {
            newRevealOrHide = 'SHOW'
        } else if (this.state.revealOrHide === 'SHOW') {
            newRevealOrHide = 'HIDE';
        }
        this.setState({
            hideCrossedOut: newhideCrossedOut,
            revealOrHide: newRevealOrHide
         });
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
                    return (
                    <Task   key={task.id}
                            index={index}
                            task={task}
                            handleTaskClick={this.handleTaskClick}
                            handleDelete={this.props.handleDelete}
                            getTasks={this.getTasks}
                            hideCrossedOut={this.state.hideCrossedOut} />
                )})
            );
        } else {
            return null;
        }
    }

    render() {
        return (
            <div className="list-container">
                <div className="list-title">{this.state.userName.toUpperCase()}'S TO DO LIST</div>
                <div className="list-body-container">
                    <div className="task-grid">
                        <div className="task-headers">
                            <div className="header">Status</div>
                            <div className="header">Task</div>
                            <div className="header">Description</div>
                        </div>
                        {this.renderTaskOrEditForm()}
                        <TaskForm   isAdding={this.props.isAdding}
                                    taskToEdit={this.props.taskToEdit}
                                    handleTaskSubmit={this.props.handleTaskSubmit} />
                    </div>
                    <div className="bottom-container">
                        <button
                            className="show-crossed-off"
                            onClick={this.handleHideClick}>
                                {this.state.revealOrHide} CROSSED OFF
                        </button>
                        <button
                            className="log-out"
                            onClick={this.props.handleLogOutSubmit}>
                                LOG OUT
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default TaskList;
