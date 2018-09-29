import React, { Component } from 'react';

class Task extends Component {
    constructor(props) {
        super(props);
        this.state = {
          taskHovered: false,
          isCrossedOff: props.task.crossed_off
         };

        this.renderStatus = this.renderStatus.bind(this);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.handleTaskClick = this.handleTaskClick.bind(this);
    }

    renderStatus(isCrossedOff) {
        if (isCrossedOff) {
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
          const resp = await fetch(`/api/tasks/show/${taskId}`);
          const editedTask = await resp.json();
          this.setState({ isCrossedOff: editedTask.crossed_off });
        } catch (error) {
          throw Error(error);
        }
        this.props.getTasks();
    }

    render() {
        let { task, index, hideCrossedOut } = this.props;
        let className = this.props.task.crossed_off ? 'task-text' : null;
        let containerClass = hideCrossedOut && this.state.isCrossedOff
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
                    <span className={className}>{this.renderStatus(this.state.isCrossedOff)}</span>
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
