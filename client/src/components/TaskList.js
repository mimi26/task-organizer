import React, { Component } from 'react';

class TaskList extends Component {
    constructor() {
        super();
    }

    // iceCreamDelete(id) {
    //     fetch(`/api/icecream/${id}`, {
    //         method: 'DELETE',
    //     }).then(res => res.json())
    //         .then(res => {
    //             console.log(res);
    //             this.setState({
    //                 fireRedirect: true,
    //                 redirectPath: '/ice-cream',
    //             });
    //         }).catch(err => console.log(err));
    // }

    render() {
        return (
            <div>
                <h1>Things to do:</h1>
                {this.props.tasks.map(task => {
                    return(
                        <div key={task.id}>
                            {task.title}
                            {task.task}
                            <button>Edit Task</button>
                            <button onClick={() => this.props.handleDelete(task.id)}>Delete Task</button>
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default TaskList;