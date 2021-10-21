import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";


import Login from './components/Login';
import Home from './components/Home';
import SearchResults from './components/SearchResults'
import UserComponent from './components/UserComponent';
import EditUserComponent from './components/EditUserComponent';
import PlatformComponent from './components/Login';
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
                //should be /u/:id/edit
                <Route path="/platform" exact component={PlatformComponent} />
                //should be /p/:id/edit
                <Route path="/platform/badges" exact component={PlatformBadgesComponent} />
                //should be /p/:id/badges
                <Route path="/platform/leaderboard" exact component={PlatformLeaderboardComponent} />
                //should be /p/:id/leaderboard
                <Route path="/quiz" exact component={QuizComponent} />
                //should be /q/:id
                <Route path="/quiz/res" exact component={QuizResult} />
                //should be /q/:id/res
                <Route path="/search" exact component={SearchResults} />
                //should be /s/:term
            </Router>
        )
    }
}

export default App;