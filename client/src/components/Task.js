import React, { Component } from 'react';

class Task extends Component {
    constructor(props) {
        super(props);
        this.state = {
          taskHovered: false,
          isCrossedOff: this.props.task.crossed_off
         };

        this.renderStatus = this.renderStatus.bind(this);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.handleTaskClick = this.handleTaskClick.bind(this);
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

    async handleTaskClick(taskId) {
        const opts = {
          method: 'PUT',
          body: JSON.stringify({
            crossed_off: !this.props.task.crossed_off,
            user_id: localStorage.getItem('id'),
            title: this.props.task.title,
            task: this.props.task.task
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        }

        try {
          const task = await fetch(`/api/tasks/${taskId}`, opts);
          this.setState({ isCrossedOff: task.crossed_off });
        } catch (error) {
          throw Error(error);
        }
        this.props.getTasks();
    }

    render() {
        let { task, index, crossedOut } = this.props;
        let className = this.props.task.crossed_off ? 'task-text' : null;
        let containerClass = this.state.hideCrossedOut && this.state.crossedOut[index]
            ? 'crossed-out-hide'
            : 'task-container';
        let deleteClass = this.state.taskHovered ? ['delete'] : 'delete hide-delete';
        return (
            <div
                className={containerClass}
                onClick={() => this.handleTaskClick(task.id)}
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
