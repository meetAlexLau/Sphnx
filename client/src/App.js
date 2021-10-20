import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";


import Login from './components/Login';
import Home from './components/Home';
import SearchResults from './components/SearchResults'
import UserComponent from './components/UserComponent';
import EditUserComponent from './components/EditUserComponent';
import PlatformComponent from './components/Login';
import NewPlatformComponent from './components/NewPlatform';
import PlatformBadgesComponent from './components/PlatformBadges'
import PlatformLeaderboardComponent from './components/PlatformLeaderboard'
import QuizResult from './components/QuizResult'
import QuizComponent from './components/QuizComponent'




class App extends Component{

    render(){

        return(

            <Router>
                <Route path="/" exact component={Login} />
                <Route path="/home" exact component={Home} />
                <Route path="/profile" exact component={UserComponent} />
                //should be /u/:id
                <Route path="/profile/edit" exact component={EditUserComponent} />
                //should be /u/:id
                <Route path="/p/:id" exact component={PlatformComponent} />
                <Route path="/p/:id/badges" exact component={PlatformBadgesComponent} />
                <Route path="/p/:id/leaderboard" exact component={PlatformLeaderboardComponent} />
                <Route path="/q/:id" exact component={QuizComponent} />
                <Route path="/q/:id/res" exact component={QuizResult} />
                <Route path="/search" exact component={SearchResults} />
            </Router>
        )
    }
}

export default App;