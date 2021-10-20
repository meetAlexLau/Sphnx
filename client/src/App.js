import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from './components/Login';
import Home from './components/Home';
class App extends Component {
  render() {
    return ( 
      <Router>
        <Route exact path='/' component={Login} />
        <Route exact path='/home' component={Home} />
      </Router>
    )
  }
}

export default App;