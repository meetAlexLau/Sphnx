import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from './components/Login';
import Home from './components/Home';
import QuizResult from './components/QuizResult';
import SearchResult from './components/SearchResult';
class App extends Component {
  render() {
    return ( 
      <Router>
        <Route exact path='/' component={Login} />
        <Route exact path='/home' component={Home} />
        <Route exact path='/quizresult' component={QuizResult} />
        <Route exact path='/searchresult' component={SearchResult} />
      </Router>
    )
  }
}

export default App;