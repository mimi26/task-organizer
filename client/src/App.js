import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';

import Home from './components/Home';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import LogInForm from './components/LogInForm';
import Logout from './components/Logout';
import RegisterForm from './components/RegisterForm';

class App extends Component {
  constructor() {
    super();
    this.state = {
      //tasks: [],
      isAdding: false,
      taskToEdit: '',
      isLoggedIn: this.isUserAuthenticated(),
      currentUser: ''
    };

    //this.getTasks = this.getTasks.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddTask = this.handleAddTask.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.renderAddButtonOrForm = this.renderAddButtonOrForm.bind(this);
    this.handleTaskSubmit = this.handleTaskSubmit.bind(this);
    this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);
    this.handleLogInSubmit = this.handleLogInSubmit.bind(this);
    this.isUserAuthenticated = this.isUserAuthenticated.bind(this);
    this.handleLogOutSubmit = this.handleLogOutSubmit.bind(this);
    this.getUser = this.getUser.bind(this);
  }

  // componentDidMount() {
  //   this.getTasks();
  // }

  async handleDelete(id) {
    await fetch(`api/tasks/${id}`, {
      method: 'DELETE'
    });
    this.getTasks();
  }
  
  async handleTaskSubmit(event, method, data, id = '') {
    event.preventDefault();
    console.log(data);
    const user_id = localStorage.getItem('id');
    try {
      await fetch(`api/tasks/${id}`, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: data.title,
        task: data.task,
        user_id
      })
    });
      this.setState({ 
        isAdding: false,
        taskToEdit: ''
      });
    } catch (error) {
      console.log(error);
    }
    this.getTasks();
  }

  async handleRegisterSubmit(event, data) {
    event.preventDefault();
    try {
        await axios(`auth/register`, {
        method: 'POST',
        data: data
      });
    } catch(error) {
      console.log(error)
    }
  }

  async handleLogInSubmit(event, data) {
    event.preventDefault();
    try {
      const login = await axios('auth/login', {
        method: 'POST',
        data: data
      });
      localStorage.setItem("token", login.data.token);
      localStorage.setItem("user", login.data.userData.username);
      localStorage.setItem("id", login.data.userData.id);
      this.setState({ isLoggedIn: this.isUserAuthenticated() });
      this.getUser();
    } catch(error) {
      console.log(error);
    }
  }

  async handleLogOutSubmit(event) {
    event.preventDefault();
    try {
      await axios.post('http://localhost:3001/auth/logout');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('id');
      this.setState({ 
        isLoggedIn: this.isUserAuthenticated(),
        currentUser: ''
       });
    }
    catch (error) {
      console.log(error);
    }
  }

  getUser() {
    this.setState({ currentUser: localStorage.getItem('id') });
  }

  isUserAuthenticated() {
    return localStorage.getItem('token') !== null;
  }

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
          {/* <LogInForm handleLogInSubmit={this.handleLogInSubmit} /> */}
          <Logout handleLogOutSubmit={this.handleLogOutSubmit}/>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/register' component={props => <RegisterForm {...props}
                                          handleRegisterSubmit={this.handleRegisterSubmit} />} />
            <Route path="/login" component={props => <LogInForm {...props}
                                          handleLogInSubmit={this.handleLogInSubmit} />} />
            <Route path='/tasks/:user' component={(props) => <TaskList {...props} 
                                          //tasks={this.state.tasks}
                                          handleDelete={this.handleDelete}
                                          handleEdit={this.handleEdit}
                                          taskToEdit={this.state.taskToEdit}
                                          isAdding={this.state.isAdding} 
                                          handleTaskSubmit={this.handleTaskSubmit} />} />
            
          </Switch>
          {this.renderAddButtonOrForm()}
          {(this.state.currentUser) && <Redirect to={`/tasks/${this.state.currentUser}`} />}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;