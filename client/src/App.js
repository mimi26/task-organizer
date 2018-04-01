import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';

import Home from './components/Home';
import TaskList from './components/TaskList';
import LogInForm from './components/LogInForm';
import RegisterForm from './components/RegisterForm';

class App extends Component {
  constructor() {
    super();
    this.state = {
      tasks: [],
      isAdding: false,
      taskToEdit: '',
      isLoggedIn: false,
      isRegistered: false,
      currentUserId: localStorage.getItem('id') ? localStorage.getItem('id') : '',
      currentUserName: localStorage.getItem('user') ? localStorage.getItem('user') : ''
    };

    this.getTasks = this.getTasks.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddTask = this.handleAddTask.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleTaskSubmit = this.handleTaskSubmit.bind(this);
    this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);
    this.handleLogInSubmit = this.handleLogInSubmit.bind(this);
    this.isUserAuthenticated = this.isUserAuthenticated.bind(this);
    this.handleLogOutSubmit = this.handleLogOutSubmit.bind(this);
  }

  componentDidMount() {
    // this.getUser();
    this.isUserAuthenticated();
    // this.getTasks();
  }

  async getTasks() {
    let userId = this.state.currentUserId;
    if(userId) { 
      try {
        let tasks = await axios(`https://desolate-gorge-81835.herokuapp.com/api/tasks/${userId}`);
        this.setState({ tasks: tasks.data });
      } catch (error) {
        console.log(error);
      }
    }
  }
  
  async handleTaskSubmit(event, method, data, id = '') {
    event.preventDefault();
    const user_id = localStorage.getItem('id');
    try {
      await fetch(`https://desolate-gorge-81835.herokuapp.com/api/tasks/${id}`, {
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

  async handleDelete(id) {
    await fetch(`https://desolate-gorge-81835.herokuapp.com/api/tasks/${id}`, {
      method: 'DELETE'
    });
    this.getTasks();
  }

  async handleRegisterSubmit(event, data) {
    event.preventDefault();
    try {
      await axios(`https://desolate-gorge-81835.herokuapp.com/auth/register`, {
        method: 'POST',
        data: data
      });
      this.setState({ isRegistered: true });
    } catch(error) {
      console.log(error)
    }
  }

  async handleLogInSubmit(event, data) {
    event.preventDefault();
    try {
      const login = await axios('https://desolate-gorge-81835.herokuapp.com/auth/login', {
        method: 'POST',
        data: data
      });
      localStorage.setItem("token", login.data.token);
      localStorage.setItem("user", login.data.userData.username);
      localStorage.setItem("id", login.data.userData.id);
      this.setState({ 
        currentUserId: login.data.userData.id,
        isLoggedIn: true
       });
      //  this.getTasks();
    } catch(error) {
      console.log(error);
    }
  }

  async handleLogOutSubmit(event) {
    event.preventDefault();
    try {
      await axios.post('https://desolate-gorge-81835.herokuapp.com/auth/logout');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('id');
      this.setState({ 
        isLoggedIn: false,
        currentUserId: '',
        currentUserName: '',
        tasks: []
       });
    }
    catch (error) {
      console.log(error);
    }
  }

  isUserAuthenticated() {
    if(localStorage.getItem('token') !== null) {
      this.setState({ isLoggedIn: true });
    }
  }

  handleAddTask() {
    this.setState({ isAdding: true });
  }

  handleEdit(task) {
    this.setState({ taskToEdit: task });
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path='/' component={props => <Home {...props}
                                          currentUserName={this.state.currentUserName}
                                          currentUserId={this.state.currentUserId}
                                          isAdding={this.state.isAdding}
                                          taskToEdit={this.state.taskToEdit}
                                          handleTaskSubmit={this.handleTaskSubmit}
                                          handleLogOutSubmit={this.handleLogOutSubmit} />} />
            <Route path='/register' component={props => <RegisterForm {...props}
                                          handleRegisterSubmit={this.handleRegisterSubmit} />} />
            <Route path="/login" component={props => <LogInForm {...props}
                                          handleLogInSubmit={this.handleLogInSubmit} />} />
            <Route path='/tasks/:user' component={(props) => <TaskList {...props} 
                                          tasks={this.state.tasks}
                                          handleDelete={this.handleDelete}
                                          handleEdit={this.handleEdit}
                                          taskToEdit={this.state.taskToEdit}
                                          isAdding={this.state.isAdding} 
                                          handleTaskSubmit={this.handleTaskSubmit}
                                          getTasks={this.getTasks}
                                          currentUserName={this.state.currentUserName}
                                          handleAddTask={this.handleAddTask}
                                          handleLogOutSubmit={this.handleLogOutSubmit} />} />
            
          </Switch>
          {(this.state.isLoggedIn) 
              ? <Redirect to={`/tasks/${this.state.currentUserId}`} /> 
              : <Redirect to='/' />}
          {this.state.isRegistered && <Redirect to='/login' />}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;