import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { GoogleLogout } from 'react-google-login';
import '../css/Home.css';
import axios from 'axios';
import PlatformSearchBar from "./PlatformSearchBar"
//import PlatData from "../Data.json"
import Image from 'react-bootstrap/Image'
import QuizSearchBar from './QuizSearchBar';
import UserSearchBar from './UserSearchBar';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.routeChangeLogout = this.routeChangeLogout.bind(this);
        this.routeChangeProfile = this.routeChangeProfile.bind(this);
        this.routeChangePlatform = this.routeChangePlatform.bind(this);
        this.routeChangeQuiz = this.routeChangeQuiz.bind(this);
        this.routeChangePost = this.routeChangePost.bind(this);
        this.renderPlatforms = this.renderPlatforms.bind(this);
        this.renderSubscribePlatforms = this.renderSubscribePlatforms.bind(this);
        this.pullQuizzes = this.pullQuizzes.bind(this);
        this.pullUsers = this.pullUsers.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.topUsers = this.topUsers.bind(this);
        this.state = {
            isLoggedIn: sessionStorage.getItem('isLoggedIn'),
            ProfileID: '',
            UserID: '',
            UserName: '',
            UserEmail: '',
            Platforms: [],
            Quizzes: [],
            Users: [],
            UserSubscribedPlatformArray: [],
            searchBarSelection: 0,
            searchBarCategory: 'platform',
            top15users: []
        }
    }
    componentDidMount() {
        if (this.state.isLoggedIn == "false" || this.state.isLoggedIn == undefined) {
            this.props.history.push('/')
        }
        else{
            console.log("Mounting")
            axios.get('/users/UserID/' + sessionStorage.getItem('UserID'))
                .then((res) => {
                    let User = res.data[0];
                    this.setState({
                        ProfileID: User._id,
                        UserName: User.UserName,
                        UserID: User.UserID,
                        UserEmail: User.UserEmail,
                        UserSubscribedPlatformArray: User.UserSubscribedPlatformArray
                    });
                    sessionStorage.setItem('ID', User._id)
                    this.renderSubscribePlatforms();
                })
                .catch((err) => {
                    console.log(err);
                })
            this.renderPlatforms();
            this.pullQuizzes();
            this.pullUsers();
            this.topUsers();
        }
    }
    routeChangeLogout() {
        //should be  /home/:userid
        this.props.history.push('/')
    }
    /*
    routeChangeProfile() {
        //should be  /profile/:userid

        this.props.history.push('/profile')
    }
    */
    routeChangeProfile = (ProfileID) => {
        //should be  /profile/:userid
        this.props.history.push({
            pathname: '/profile/' + ProfileID,
            state: { isLoggedIn: true }
        });
    }


    routeChangePlatform = (PlatformID) => {
        //should be  /profile/:userid
        sessionStorage.setItem('current platform', PlatformID);
        sessionStorage.setItem('previous platform', PlatformID);
        this.props.history.push({
            pathname: '/platform/' + PlatformID,
            state: { isLoggedIn: true }
        });
    }
    routeChangeQuiz = (QuizID) => {
        //should be  /profile/:userid
        sessionStorage.setItem('current quiz', QuizID);
        sessionStorage.setItem('previous quiz', QuizID);
        this.props.history.push({
            pathname: '/quiz/' + QuizID,
            state: { isLoggedIn: true }
        });
    }
    routeChangePost = (PostID) => {
        //should be  /profile/:userid
        sessionStorage.setItem('current post', PostID);
        sessionStorage.setItem('previous post', PostID);
        this.props.history.push({
            pathname: '/post/' + PostID,
            state: { isLoggedIn: true }
        });
    }

    logout = (response) => {
        console.log(response)
        this.props.history.push('/')
        sessionStorage.clear()
    }

    renderPlatforms = async () => {
        let p = [];
        try {
            await axios.get('/platforms')
                .then(res => {
                    p = res.data
                    for (var i = 0; i < p.length; i++) {
                        this.setState({
                            Platforms: this.state.Platforms.concat([p[i]])
                        })
                    }
                })
        } catch (err) {
            console.log(err)
        }
    }

    renderSubscribePlatforms = async () => {
        let result = [];
        let subplatforms = this.state.UserSubscribedPlatformArray;
        for (let i = 0; i < subplatforms.length; i++) {
            await axios.get('http://localhost:4000/platforms/' + subplatforms[i])
                .then(res => {
                    let p = res.data;
                    let r = [p.PlatformName, p.PlatformID]
                    result.push(r)
                })
        }
        this.setState({
            UserSubscribedPlatformArray: result
        })
    }

    pullQuizzes = async () => {
        let q = [];
        try {
            await axios.get('/quizzes')
                .then(res => {
                    q = res.data
                    for (var i = 0; i < q.length; i++) {
                        this.setState({
                            Quizzes: this.state.Quizzes.concat([q[i]])
                        })
                    }
                })
        } catch (err) {
            console.log(err)
        }
    }

    pullUsers = async () => {
        let u = [];
        try {
            await axios.get('/users')
                .then(res => {
                    u = res.data
                    for (var i = 0; i < u.length; i++) {
                        this.setState({
                            Users: this.state.Users.concat([u[i]])
                        })
                    }
                })
        } catch (err) {
            console.log(err)
        }
    }


    toggle() {
        var psearch = document.getElementById('platsearch');
        var qsearch = document.getElementById('quizsearch');
        var usearch = document.getElementById('usersearch');

        if (this.value == '1') {
            psearch.style.display = 'block';
            qsearch.style.display = 'none';
            usearch.style.display = 'none';

        } else if (this.value == '2') {
            psearch.style.display = 'none';
            qsearch.style.display = 'block';
            usearch.style.display = 'none';

        } else if (this.value == '3') {
            psearch.style.display = 'none';
            qsearch.style.display = 'none';
            usearch.style.display = 'block';

        }
    }

    handleSearchChange(event) {
        //console.log("this is exampleL:"+event.target.value)
        if (event.target.value == "platform") {
            this.setState({ searchBarSelection: 0, searchBarCategory: "platform" })
        } else if (event.target.value == "quiz") {
            this.setState({ searchBarSelection: 1, searchBarCategory: "quiz" })
        } else {
            this.setState({ searchBarSelection: 2, searchBarCategory: "user" })
        }

    }

    topUsers(){
        axios.get('http://localhost:4000/users')
            .then(res => {
                let users = res.data;
                let top15users = users.sort((a,b) => b.UserPoints - a.UserPoints).slice(0,25);
                this.setState({
                    top15users: top15users
                })
            })
    }

    render() {
        //Platform grid
        let plats = this.state.Platforms?.map((plat, i) => (        //map each platform to structure <Col>
            //<li key={i}>{plat.PlatformName}</li>
            
                <Card key={i} className='activityCard'>
                    <Card.Img variant='top' className='activityCardImage' src={plat.PlatformPicture}>
                    </Card.Img>
                    <Card.Title>
                        {plat.PlatformDesc}
                    </Card.Title>
                    <Button className='activityCardButton' onClick={() => this.routeChangePlatform(plat._id)} variant="primary">
                        {plat.PlatformName}
                    </Button>
                </Card>
            
        ))
        let rendplats = [];             //row oriented platforms
        while (plats.length > 0) {        //splice the array of platforms into groups of 4
            let chunk = plats.splice(0, 4);
            rendplats.push(chunk)
        }
        for (var j = 0; j < rendplats.length; j++) {          //each chunk is a group of 4, surround with <Row>
            rendplats[j] = <Row className='activityRow'> {rendplats[j]} </Row>
        }

        let subplats = this.state.UserSubscribedPlatformArray?.map((plat, i) => (

            <Row key={i} className='subscriptionrow'>
                <Button className='subscriptionbutton' onClick={() => this.routeChangePlatform(plat[1])} style={{ textOverflow: 'ellipsis' }}>
                    <Form.Text className='subscriptions'>
                        {plat[0]}
                    </Form.Text>
                </Button>
            </Row>
        ))

        let top15users = this.state.top15users?.map((user, i) => (
            <Row key={i} className='topuserrow'>
                <Button className='subscriptionbutton' onClick={() => this.routeChangeProfile(user._id)} style={{ textOverflow: 'ellipsis' }}>
                    <Form.Text className='topuser'>
                        {user.UserName}
                    </Form.Text>
                </Button>
            </Row>
        ))

        let searchBar = <PlatformSearchBar id='platsearch' placeholder="Search Platforms..." data={this.state.Platforms} />
        if (this.state.searchBarSelection == 1) {
            searchBar = <QuizSearchBar id='quizsearch' placeholder="Search Quizzes..." data={this.state.Quizzes} />
        } else if (this.state.searchBarSelection == 2) {
            searchBar = <UserSearchBar id='usersearch' placeholder="Search Users..." data={this.state.Users} />
        }
        return (
            <Container fluid className='homeBackground containerrow'> {/* home container*/}
                <Row className='medium homeTitleRow'> {/*Logout | Title | Profile */}
                    <GoogleLogout className='homeLogout'
                        clientId='787055066898-kiaajnba1a2dpgk2lvkg20uhsn70pe3i.apps.googleusercontent.com'
                        buttonText="Logout"
                        onLogoutSuccess={this.logout}
                        isSignedIn={false}
                    >
                    </GoogleLogout>
                    <Card body className='homeCard' >
                        <Card.Img src={'https://res.cloudinary.com/sphnx/image/upload/v1637208733/spnhxLogoTransparent_csgze4.png'} fluid />
                        <Card.Text>
                            Welcome, {this.state.UserName}!
                        </Card.Text>
                    </Card>
                    <Button className='ml-auto gray homeProfile' onClick={/*this.routeChangeProfile*/() => this.routeChangeProfile(this.state.ProfileID)} variant="primary">
                        Profile
                    </Button>
                </Row>
                <Row  className='medium homesearchbar'>
                    <Col xs={1} className="d-flex justify-content-end block-example border-right border-dark">
                        <select className="selection" value={this.state.searchBarCategory} onChange={this.handleSearchChange}>
                            <option value="platform">Platform</option>
                            <option value="quiz">Quiz</option>
                            <option value="user">User</option>

                        </select>
                    </Col>
                    <Col className="d-flex justify-content-start">
                        {searchBar}
                    </Col>
                </Row>

                <Container className='homecontainer'>
                    <Row className='medium homerow'>
                        <Col className='homeColumn'>
                            <Row style={{justifyContent: 'center'}}>
                                <Card>
                                    TOP USERS
                                </Card>
                            </Row>
                            {top15users}
                        </Col>
                        <Col className='medium' style={{alignContent: 'center'}}>
                            <Row>
                                <h2 className='ml-auto mr-auto'>
                                    PLATFORMS FOR YOU
                                </h2>
                            </Row>
                            {//Render Platforms
                                rendplats
                            }
                        </Col>
                        <Col className='homeColumn'>
                            <Row style={{justifyContent: 'center'}}>
                                <Card>
                                    SUBSCRIPTIONS
                                </Card>
                            </Row>
                            {subplats}
                        </Col>
                    </Row>
                </Container>
                
            </Container>
        )
    }
}