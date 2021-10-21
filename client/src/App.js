import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Login from './components/Login';
import Home from './components/Home';
import UserComponent from './components/UserComponent';
import EditUserComponent from './components/EditUserComponent';



class App extends Component{

    render(){

        return(

            <Router>
                <Route path="/" exact component={Login} />
                <Route path="/home" exact component={Home} />
                <Route path="/profile" exact component={UserComponent} />
                <Route path="/profile/edit" exact component={EditUserComponent} />
            </Router>
        )
    }
}

export default App;