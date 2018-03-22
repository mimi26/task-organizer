import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

class App extends Component {
  constructor() {
    super();
    this.state = {
      tasks: [],
      isAdding: false,
      taskToEdit: ''
    };

    this.getTasks = this.getTasks.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddTask = this.handleAddTask.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.renderAddButtonOrForm = this.renderAddButtonOrForm.bind(this);
    this.handleTaskSubmit = this.handleTaskSubmit.bind(this);
  }

  componentDidMount() {
    this.getTasks();
  }

  async getTasks() {
    let tasks = await fetch('api/tasks');
    tasks = await tasks.json();
    await this.setState({ tasks });
  }

  async handleDelete(id) {
    await fetch(`/api/tasks/${id}`, {
      method: 'DELETE'
    });
    this.getTasks();
  }
  
  async handleTaskSubmit(event, method, data, id = '') {
    console.log("this is data:", data);
    event.preventDefault();
    await fetch(`/api/tasks/${id}`, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    this.setState({ 
      isAdding: false,
      taskToEdit: ''
    });
    this.getTasks();
  }

  // iceCreamSubmit(method, event, data, id) {
  //   event.preventDefault();
  //   fetch(`/api/icecream/${id || ''}`, {
  //     method: method,
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(data),
  //   }).then(res => res.json())
  //     .then(res => {
  //       this.setState({
  //         fireRedirect: true,
  //         redirectPath: `/ice-cream/${res.data.icecream.id}`,
  //       })
  //     });
  // }

  handleAddTask() {
    this.setState({ isAdding: true });
  }

  handleEdit(task) {
    this.setState({ taskToEdit: task });
  }

  renderAddButtonOrForm() {
    if(this.state.isAdding) {
      return (
        <TaskForm isAdding={this.state.isAdding} 
                  taskToEdit={this.state.taskToEdit}
                  handleTaskSubmit={this.handleTaskSubmit} />
      );
    } else {
      return (
        <button onClick={this.handleAddTask}>Add New Task</button>
      );
    }
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path="/" component={(props) => <TaskList {...props} 
                                          tasks={this.state.tasks}
                                          handleDelete={this.handleDelete}
                                          handleEdit={this.handleEdit}
                                          taskToEdit={this.state.taskToEdit}
                                          isAdding={this.state.isAdding} 
                                          handleTaskSubmit={this.handleTaskSubmit} />} />
          </Switch>
          {this.renderAddButtonOrForm()}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;