import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Login from './components/Login';
import Home from './components/Home';
import QuizResult from './components/QuizResult';
import SearchResult from './components/SearchResult';
import NewBadgeComponent from './components/NewBadgeComponent';
import NewPlatformComponent from './components/NewPlatformComponent';
import NewQuizComponent from './components/NewQuizComponent';
import NewPostComponent from './components/NewPostComponent';
import UserComponent from './components/UserComponent';
import EditUserComponent from './components/EditUserComponent';

import MyBadgeComponent from './components/MyBadgeComponent';
import PlatformBadgeComponent from './components/PlatformBadgeComponent';
import PlatformLeaderboardComponent from './components/PlatformLeaderboardComponent';
import PlatformComponent from './components/PlatformComponent';
import QuizComponent from './components/QuizComponent';


class App extends Component{

    render(){

        return(

            <Router>
                <Route path="/" exact component={Login} />
                <Route path="/home" exact component={Home} />
                <Route path="/profile" exact component={UserComponent} />
                <Route path="/profile/edit" exact component={EditUserComponent} />
                <Route path='/newPlatform' exact component={NewPlatformComponent}/>
                <Route path='/newBadge' exact component={NewBadgeComponent}/>
                <Route path='/newQuiz' exact component={NewQuizComponent}/>
                <Route path='/newPost' exact component={NewPostComponent}/>
                <Route path="/myBadge" exact component={MyBadgeComponent} />
                <Route path="/platformBadge" exact component={PlatformBadgeComponent} />
                <Route path='/platformLeaderboard' exact component={PlatformLeaderboardComponent}/>
                <Route path='/platform/:id' exact component={PlatformComponent}/>
                <Route path='/quiz/:id' exact component={QuizComponent}/>
                <Route path='/QuizResult' exact component={QuizResult} />
            </Router>
        )
    }
}

export default App;
