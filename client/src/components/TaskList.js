import React, { Component } from 'react';
import axios from 'axios';
import TaskForm from './TaskForm';

class TaskList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            currentUser: props.match.params.user
        }
        this.getTasks = this.getTasks.bind(this);
    }

    async getTasks() {
        let userId = this.state.currentUser;
        try {
            let tasks = await axios(`http://localhost:3001/api/tasks/${userId}`);
            this.setState({ tasks: tasks.data });
        } catch (error) {
            console.log(error);
        }
    }

    componentWillMount() {
        this.getTasks();
    }

    renderTaskOrEditForm() {
        if (this.props.taskToEdit) {
            return (
                <TaskForm isAdding={this.props.isAdding}
                    taskToEdit={this.props.taskToEdit}
                    handleTaskSubmit={this.props.handleTaskSubmit} />
            );
        } else {
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
        }
    }
    render() {
        return (
            <div>
                <h1>Things to do:</h1>
                {this.renderTaskOrEditForm()}
            </div>
        );
    }
}

export default TaskList;