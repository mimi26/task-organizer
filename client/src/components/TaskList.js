import React, { Component } from 'react';
import TaskForm from './TaskForm';

class TaskList extends Component {

    // componentWillMount() {
    //     this.props.getTasks();
    // }

    renderAddButtonOrForm() {
        if (this.props.currentUserName) {
            if (this.props.isAdding) {
                return (
                    <TaskForm isAdding={this.props.isAdding}
                        taskToEdit={this.props.taskToEdit}
                        handleTaskSubmit={this.props.handleTaskSubmit} />
                );
            } else {
                return (
                    <button onClick={this.handleAddTask}>Add New Task</button>
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
        } else {
            return (
                this.props.tasks.map(task => {
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
                {this.renderAddButtonOrForm()}
            </div>
        );
    }
}

export default TaskList;