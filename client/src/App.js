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
import EditPlatformComponent from './components/EditPlatformComponent';
import MyBadgeComponent from './components/MyBadgeComponent';
import PlatformBadgeComponent from './components/PlatformBadgeComponent';
import PlatformLeaderboardComponent from './components/PlatformLeaderboardComponent';
import PlatformComponent from './components/PlatformComponent';
import QuizComponent from './components/QuizComponent';
import PostComponent from './components/PostComponent';
import EditPostComponent from './components/EditPostComponent'
import EditQuizComponent from "./components/EditQuizComponent";

class App extends Component{

    render(){

        return(

            <Router>
                <Route path="/" exact component={Login}/>
                <Route path="/home" exact component={Home} />
                <Route path="/profile/:id" exact component={UserComponent} />
                <Route path="/profile/edit/:id" exact component={EditUserComponent} />
                <Route path='/newPlatform' exact component={NewPlatformComponent}/>
                <Route path='/newBadge' exact component={NewBadgeComponent}/>
                <Route path='/newQuiz' exact component={NewQuizComponent}/>
                <Route path='/newPost' exact component={NewPostComponent}/>
                <Route path="/myBadge/:id" exact component={MyBadgeComponent} />
                <Route path="/platformBadge" exact component={PlatformBadgeComponent} />
                <Route path='/platformLeaderboard' exact component={PlatformLeaderboardComponent}/>
                <Route path='/platform/:id' exact component={PlatformComponent}/>
                <Route path='/quiz/:id' exact component={QuizComponent}/>
                <Route path='/post/:id' exact component={PostComponent}/>
                <Route path='/QuizResult' exact component={QuizResult} />
                <Route path='/editPlatform/:id' exact component={EditPlatformComponent} />
                <Route path='/editPost/:id' exact component={EditPostComponent} />
                <Route path='/editQuiz/:id' exact component={EditQuizComponent} />
            </Router>
        )
    }
}

export default App;
