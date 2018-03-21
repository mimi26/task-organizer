import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import TaskList from './components/TaskList';

class App extends Component {
  constructor() {
    super();
    this.state = {

    }
    this.getTasks = this.getTasks.bind(this);
  }

  componentDidMount() {
    this.getTasks();
  }

  async getTasks () {
    const tasks = await fetch('api/tasks');
    console.log(await tasks.json());
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={(props) => <TaskList {...props} />} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;

// componentDidMount() {
//   if (this.state.currentPage === 'index') {
//     fetch('/api/icecream')
//       .then(res => res.json())
//       .then(res => {
//         this.setState({
//           allIceCreams: res.data.icecreams,
//           dataLoaded: true,
//         });
//       }).catch(err => console.log(err));
//   } else if (this.state.currentPage === 'show' || this.state.currentPage === 'edit') {
//     fetch(`/api/icecream/${this.state.currentId}`)
//       .then(res => res.json())
//       .then(res => {
//         this.setState({
//           currentIceCream: res.data.icecream,
//           dataLoaded: true,
//         })
//       }).catch(err => console.log(err));
//   } else if (this.state.currentPage === 'new') {
//     this.setState({
//       dataLoaded: true,
//     })
//   }
// }
       
