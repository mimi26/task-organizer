import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import TaskList from './components/TaskList';

class App extends Component {
  constructor() {
    super();
    this.state = {
      tasks: []
    }
    this.getTasks = this.getTasks.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.getTasks();
  }

  async getTasks () {
    let tasks = await fetch('api/tasks');
    tasks = await tasks.json();
    await this.setState({ tasks });
  }

  async handleDelete(id) {
    const deleteTask = await fetch(`/api/tasks/${id}`, {
      method: 'DELETE'
    });
    this.getTasks();
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={(props) => <TaskList {...props} 
                                        tasks={this.state.tasks}
                                        handleDelete={this.handleDelete} />} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;