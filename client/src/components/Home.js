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
import SearchBar from "../components/SearchBar"
import PlatData from "../Data.json"
import Image from 'react-bootstrap/Image'

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
        this.state = {
            isLoggedIn: sessionStorage.getItem('isLoggedIn'),
            UserID: '',
            UserName: '',
            UserEmail: '',
            Platforms: [],
            Quizzes: [],
            Users: [],
            UserSubscribedPlatformArray: []
        }
    }
    componentDidMount() {
        if (this.state.isLoggedIn !== "true") {
            this.props.history.push('/')
        }
        else {
            axios.get('http://localhost:4000/users/UserID/' + sessionStorage.getItem('UserID'))
                .then((res) => {
                    let User = res.data[0];
                    this.setState({
                        UserName: User.UserName,
                        UserID: User.UserID,
                        UserEmail: User.UserEmail,
                        UserSubscribedPlatformArray: User.UserSubscribedPlatformArray
                    });
                    this.renderSubscribePlatforms();
                })
                .catch((err) => {
                    console.log(err);
                })
            this.renderPlatforms();
        }
    }
    routeChangeLogout() {
        //should be  /home/:userid
        this.props.history.push('/')
    }
    routeChangeProfile() {
        //should be  /profile/:userid

        this.props.history.push('/profile')
    }
    routeChangePlatform = (PlatformID) => {
        //should be  /profile/:userid
        sessionStorage.setItem('current platform', PlatformID);
        sessionStorage.setItem('previous platform', PlatformID);
        this.props.history.push('/platform/' + PlatformID);
    }
    routeChangeQuiz = (QuizID) => {
        //should be  /profile/:userid
        sessionStorage.setItem('current quiz', QuizID);
        sessionStorage.setItem('previous quiz', QuizID);
        this.props.history.push('/quiz/' + QuizID);
    }
    routeChangePost = (PostID) => {
        //should be  /profile/:userid
        sessionStorage.setItem('current post', PostID);
        sessionStorage.setItem('previous post', PostID);
        this.props.history.push('/post/' + PostID);
    }

    logout = (response) => {
        console.log(response)
        this.props.history.push('/')
        sessionStorage.clear()
    }

    renderPlatforms = async () => {
        let p = [];
        try {
            await axios.get('http://localhost:4000/platforms')
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

    /*
    renderQuizzes = async () => {
        let q = [];
        try {
            await axios.get('http://localhost:4000/quizzes')
                .then(res => {
                    q = res.data;
                    for (var i = 0; i < q.length; i++) {
                        this.setState({
                            Quizzes: this.state.Quizzes.concat([q[i]])
                        })
                    }
                })
        } catch (err) {
            console.log(err);
        }
    }
    */

    /*
    renderUsers = async () => {
        let u = [];
        try {
            await axios.get('http://localhost:4000/users')
                .then(res => {
                    u = res.data;
                    for (var i = 0; i < u.length; i++) {
                        this.setState({
                            Users: this.state.Users.concat([u[i]])
                        })
                    }
                })
            console.log(this.state.Users)
        } catch (err) {
            console.log(err);
        }
    }
    */

    renderSubscribePlatforms= async() =>{
        let result = [];
        let subplatforms = this.state.UserSubscribedPlatformArray;
        for(let i =0; i < subplatforms.length; i++){
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
    render() {
        //Platform grid
        let plats = this.state.Platforms?.map((plat, i) => (        //map each platform to structure <Col>
            //<li key={i}>{plat.PlatformName}</li>
            <Col key={i} className = 'ml-auto mr-auto'>
                <Card className='activityCard'>
                    <Card.Img variant='top' className='activityCardImage' src={plat.PlatformPicture}>
                    </Card.Img>
                    <Card.Title>
                        {plat.PlatformDesc}
                    </Card.Title>
                    <Button className='activityCardButton' onClick={() => this.routeChangePlatform(plat._id)} variant="primary">
                        {plat.PlatformName}
                    </Button>
                </Card>
            </Col>
        ))
        let rendplats = [];             //row oriented platforms
        while (plats.length > 0) {        //splice the array of platforms into groups of 4
            let chunk = plats.splice(0, 4);
            rendplats.push(chunk)
        }
        for (var j = 0; j < rendplats.length; j++) {          //each chunk is a group of 4, surround with <Row>
            rendplats[j] = <Row className='ml-auto mr-auto'> {rendplats[j]} </Row>
        }

        let subplats = this.state.UserSubscribedPlatformArray?.map((plat, i) => (
            
            <Row key={i} className='subscriptionrow'>
                <Button className='subscriptionbutton'onClick={() => this.routeChangePlatform(plat[1])} style={{textOverflow:'ellipsis'}}>
                    <Form.Text className='subscriptions'>
                        {plat[0]}
                    </Form.Text>
                </Button>
            </Row>
        ))
        //
        //Quiz grid
        /*
        let quizs = this.state.Quizzes?.map((quiz, i) => (
            <Col key={i} className='ml-auto mr-auto' style={{maxWidth:'250px'}}>
                <Card className='activityCard'>
                    <Card.Img variant='top' className='activityCardImage' src={quiz.QuizBackground}></Card.Img>
                    <Button className='activityCardButton' onClick={() => this.routeChangeQuiz(quiz._id)} variant="primary">
                        {quiz.QuizTitle}
                    </Button>
                </Card>
            </Col>

        ))
        let rendquizs = [];
        while (quizs.length > 0) {        //splice the array of platforms into groups of 4
            let chunk = quizs.splice(0, 4);
            rendquizs.push(chunk)
        }
        for (var j = 0; j < rendquizs.length; j++) {          //each chunk is a group of 4, surround with <Row>
            rendquizs[j] = <Row> {rendquizs[j]} </Row>
        }
        */
        return (
            <Container fluid className='sky containerrow'> {/* home container*/}
                <Row className='medium marginspacing paddingspacing'> {/*Logout | Title | Profile */}
                    <GoogleLogout
                        clientId='787055066898-kiaajnba1a2dpgk2lvkg20uhsn70pe3i.apps.googleusercontent.com'
                        buttonText="Logout"
                        onLogoutSuccess={this.logout}
                        isSignedIn={false}
                    >
                    </GoogleLogout>
                    <Card body className='ml-auto' style={{ width: "25%", textAlign: 'center', fontSize: '25px' }}>
                        <Image src={'https://res.cloudinary.com/sphnx/image/upload/v1637208733/spnhxLogoTransparent_csgze4.png'} fluid />
                        <p>
                            Welcome, {this.state.UserName}!
                        </p>
                    </Card>
                    <Button className='ml-auto gray' onClick={this.routeChangeProfile} variant="primary">
                        Profile
                    </Button>
                </Row>
                <Row className='medium homesearchbar'> {/* Search Bar */}
                        <SearchBar placeholder="Enter a platform name..." data={PlatData} />
                </Row>
                <Row className='mainFeed medium ml-auto mr-auto' style={{ alignContent: "center" }}>  {/* Home Container for Platform,Quiz,Profile */}
                    <Container fluid className='homecontainer'>
                        <Row>
                            <Card className='ml-auto mr-auto'>
                                Your News Feed
                            </Card>
                        </Row>
                        <Row className='medium' >
                            <Col className='ml-auto mr-auto' style={{maxWidth: '150px', width:'150px'}}>
                                <Row>
                                    <Card>
                                        TOP PLATFORMS
                                    </Card>
                                </Row>
                            </Col>
                            <Col className='ml-auto mr-auto medium'>
                                <Row>
                                    <h2 className='ml-auto mr-auto'>
                                        PLATFORMS FOR YOU
                                    </h2>
                                </Row>
                                {//Render Platforms
                                    rendplats
                                }
                            </Col>
                            <Col className='ml-auto mr-auto' style={{maxWidth: '150px', width:'150px'}}>
                                <Row>
                                    <Card>
                                        SUBSCRIPTIONS
                                    </Card>
                                </Row>
                                {subplats}
                            </Col>
                        </Row>
                    </Container>
                </Row>
            </Container>
        )
    }
}