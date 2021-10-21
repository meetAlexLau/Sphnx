import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";


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
                //should be /u/:id
                <Route path="/profile/edit" exact component={EditUserComponent} />
                //should be /u/:id/edit
           
            </Router>
        )
    }
}

export default App;