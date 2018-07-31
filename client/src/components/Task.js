import React, { Component } from 'react';

class Task extends Component {
    constructor() {
        super();
        this.state = { taskHovered: false };
        this.renderStatus = this.renderStatus.bind(this);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
    }

    renderStatus(index) {
        if (this.props.crossedOut[index]) {
            return 'CROSSED OUT';
        } else {
            return 'ON TIME';
        }
    }

    handleMouseEnter() {
        this.setState({ taskHovered: true });
    }

    handleMouseLeave() {
        this.setState({ taskHovered: false });
    }

    render() {
        let { task, handleTaskClick, index, crossedOut } = this.props;
        let className = crossedOut[index] ? 'task-text' : null;
        let containerClass = this.state.hideCrossedOut && this.state.crossedOut[index]
            ? 'crossed-out-hide'
            : 'task-container';
        let deleteClass = this.state.taskHovered ? ['delete'] : 'delete hide-delete';
        return (
            <div 
                className={containerClass}
                onClick={() => handleTaskClick(index)}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}>
                {/* <div className="buttons">
                                <button className="edit" onClick={() => this.props.handleEdit(task)}>Edit Task</button>
                                
                            </div> */}
                <div className="task-cell task-status">
                    <button className={deleteClass}
                        onClick={() => this.props.handleDelete(task.id)}>X</button>
                    <span className={className}>{this.renderStatus(index)}</span>
                </div>
                <div className="task-cell task-title">
                    <span className={className}>{task.title}</span>
                </div>
                <div className="task-cell task-description">
                    <span className={className}>{task.task}</span>
                </div>
            </div>
        );
    }
}

export default Task;