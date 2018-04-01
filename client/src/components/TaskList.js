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
        console.log('this is tasks:', this.state.tasks);
    }

    async getTasks() {
        let userId = parseInt(this.state.userId);
        console.log('this is usreid:', userId);
        if (userId) {
            try {
                let tasks = await axios(`https://desolate-gorge-81835.herokuapp.com/api/tasks/${userId}`);
                console.log(tasks);
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
                            <div key={task.id}>
                                Task:{task.title}<br />
                                Description/Comments:{task.task}
                                <button onClick={() => this.props.handleEdit(task)}>Edit Task</button>
                                <button onClick={() => this.props.handleDelete(task.id)}>Delete Task</button>
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
            <div>
                <h1>{this.state.userName}'s Tasks:</h1>
                {this.renderTaskOrEditForm()}
                {this.renderAddButtonOrForm()}
                <Logout handleLogOutSubmit={this.props.handleLogOutSubmit} />
                <Link to='/'>click here to return to home page</ Link>
            </div>
        );
    }
}

export default TaskList;