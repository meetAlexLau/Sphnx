import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import {GoogleLogout} from 'react-google-login';
import '../css/Home.css';
import axios from 'axios'

export default class Home extends Component{
    constructor(props){
        super(props);
        this.routeChangeLogout = this.routeChangeLogout.bind(this);
        this.routeChangeProfile = this.routeChangeProfile.bind(this);
        this.routeChangePlatform = this.routeChangePlatform.bind(this);
        this.routeChangeQuiz = this.routeChangeQuiz.bind(this);
        this.renderPlatforms = this.renderPlatforms.bind(this);
        this.state = {
            isLoggedIn: sessionStorage.getItem('isLoggedIn'),
            UserID: '',
            UserName: '',
            UserEmail: '',
            Platforms: []
        }
    }
    componentDidMount(){
        if(this.state.isLoggedIn !== "true"){
            this.props.history.push('/')
        }
        else{
            console.log("Mounting")
            axios.get('http://localhost:4000/users/UserID/' + sessionStorage.getItem('UserID'))
                .then((res) => {
                    let User = res.data[0];
                    this.setState({
                        UserName: User.UserName,
                        UserId: User.UserID,
                        UserEmail: User.UserEmail
                    });
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
    routeChangeProfile(){
        //should be  /profile/:userid
        
        this.props.history.push('/profile')
    }
    routeChangePlatform(){
        //should be  /profile/:userid
        this.props.history.push('/platform')
    }
    routeChangeQuiz(){
        //should be  /profile/:userid
        this.props.history.push('/quiz')
    }

    logout = (response) => {
        console.log(response)
        this.props.history.push('/')
        sessionStorage.clear()
    }

    renderPlatforms = async() => {
        let p = [];
        try{
            await axios.get('http://localhost:4000/platforms')
                .then(res => {
                    p = res.data
                    for(var i = 0; i < p.length; i++){
                        this.setState({
                            Platforms: this.state.Platforms.concat([p[i]])
                        })
                    }
                })
        } catch(err) {
            console.log(err)
        }
    }

    render(){
        let plats = this.state.Platforms?.map((plat, i) => (        //map each platform to structure <Col>
            //<li key={i}>{plat.PlatformName}</li>
            <Col key={i}>    
                <Card className= 'ml-auto activityCard'>
                    <div className= ''>
                        <Button onClick={this.routeChangePlatform} variant="primary">
                            {plat.PlatformName}
                        </Button>
                    </div>
                </Card>
            </Col>
        ))
        let rendplats = [];             //row oriented platforms
        while(plats.length > 0){        //splice the array of platforms into groups of 4
            let chunk = plats.splice(0, 4);     
            rendplats.push(chunk)
        }
        for(var j = 0; j < rendplats.length; j++){          //each chunk is a group of 4, surround with <Row>
            rendplats[j] = <Row> {rendplats[j]} </Row>
        }
        return (
            <Container fluid className='sky containerrow'> {/* home container*/}
                <Row className = 'medium marginspacing paddingspacing'> {/*Logout | Title | Profile */}
                    <GoogleLogout
                        clientId='787055066898-kiaajnba1a2dpgk2lvkg20uhsn70pe3i.apps.googleusercontent.com'
                        buttonText="Logout"
                        onLogoutSuccess={this.logout}
                        isSignedIn={false}
                    >
                    </GoogleLogout>
                    <Card body className='ml-auto' style={{width: "25%", textAlign: 'center', fontSize: '25px'}}>
                        Sphnx 
                        <p>
                            Welcome, [{this.state.UserName}]
                        </p>
                    </Card>
                    <Button className='ml-auto gray' onClick={this.routeChangeProfile} variant="primary">
                        Profile
                    </Button>
                </Row>
                <Row className = 'medium homesearchbar'> {/* Search Bar */}
                    <Form.Control size = 'sm' type="text" placeholder="Normal text" className='light marginspacing'/>
                </Row>
                <Row className = 'medium ml-auto mr-auto' style={{alignContent: "center"}}>  {/* Home Container for Platform,Quiz,Profile */}
                    <Container className ='homecontainer'>
                        <Row>
                            <Card className='ml-auto mr-auto'>
                                Your News Feed
                            </Card>
                        </Row>
                        
                            {rendplats}
                        
                        <Row>
                            <Button onClick={this.routeChangeQuiz} className ='marginspacing' variant="primary">
                                Example Quiz
                            </Button>
                        </Row>
                        <Row>
                            <Button onClick={this.routeChangeProfile} className ='marginspacing' variant="primary">
                                Example Profile
                            </Button>
                        </Row>
                    </Container>
                </Row>
            </Container>
        )
    }
}