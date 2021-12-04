require('dotenv').config({ path: '.env' })
import React, {Component} from 'react';
import axios from 'axios';
import GoogleLogin from 'react-google-login';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image'
import '../css/App.css';
export default class Login extends Component{
    constructor(props){
        super(props);
        this.routeChange = this.routeChange.bind(this);
        this.state = {
            isLoggedIn: false
        }
    }
    componentDidMount() {
        this.setState({
            isLoggedIn: false
        })
    }
    routeChange() {
        //should be  /home/:userid
        this.setState({
            isLoggedIn: true
        })
        this.props.history.push({
            pathname:'/home',
            state: {isLoggedIn:true}
            });
    }
    refreshTokenSetup = (res) => {
        let refreshTiming = (res.tokenObj.expires_in ||3600 - 5 * 60) * 1000;
        const refreshToken= async() => {
            const newAuthRes = await res.reloadAuthResponse();
            refreshTiming = (newAuthRes.expires_in ||3600 - 5 * 60) * 1000;
            setTimeout(refreshToken, refreshTiming);
            console.log("new token", newAuthRes.id_token)
            sessionStorage.setItem('id token', newAuthRes.id_token);
        }
        setTimeout(refreshToken, refreshTiming);
    }
    responseGoogle = (resp) => {
        let profile = resp.profileObj;
        const newUser = {
            UserID: profile.googleId + "",
            UserName: profile.name + (Math.floor(Math.random() * 1000) + 1),
            UserEmail: profile.email,
            UserPoints: 0
        }
        if(!sessionStorage.getItem("isLoggedIn")){ //CHECKS IF USER IS ALREADY LOGGED IN
            axios.get('/users/UserID/'+ newUser.UserID)
                .then((res) => {
                    let UserData = res.data[0]
                    if(typeof UserData !== 'undefined'){ //RETURNING USER
                        sessionStorage.setItem('UserID', UserData.UserID)
                        sessionStorage.setItem("profileID", UserData._id)
                        sessionStorage.setItem("id token", resp.tokenId)
                        this.refreshTokenSetup(resp)
                        this.routeChange();
                    }
                    else{                                //NEW USER
                        axios.post('/users/signUp', newUser)
                            .then((res) => {
                                console.log("NEW USER")
                                sessionStorage.setItem('UserID', newUser.UserID)
                                sessionStorage.setItem("profileID", UserData._id)
                                sessionStorage.setItem("id token", resp.tokenId)
                                console.log("TOKEN ID", resp.tokenId)
                                console.log("ACCESS TOKEN", resp.accessToken)
                                this.refreshTokenSetup(resp)
                                this.routeChange(); //change to home screen
                            })
                            .catch((err) => {
                                console.log("Axios post err " + err)
                            })
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        else{
            this.routeChange();
        }
        
    }
    userCheck = (resp) => {
        axios.get('/users/UserID/111118527412503377447')
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    render(){
        return (
            <Container fluid style={{width: '100%'}}>
                <Row className='containerrow'>
                    <Col className='medium'>
                        <Container className = 'light loginleft'>
                            <Card body className='light loginSphnx'>
                                <Image src={'https://res.cloudinary.com/sphnx/image/upload/v1637208733/spnhxLogoTransparent_csgze4.png'} fluid />
                            </Card>
                            <br/>
                            <Card className='light'>
                                Quiz yourself, Quiz your friends, Quiz Everyone!
                            </Card>
                            <GoogleLogin className = 'login'
                                clientId = '787055066898-kiaajnba1a2dpgk2lvkg20uhsn70pe3i.apps.googleusercontent.com'
                                buttonText = "Sign In With Google"
                                onSuccess = {this.responseGoogle}
                                onFailure = {this.responseGoogle}
                                cookiePolicy = {'single_host_origin'}
                                isSignedIn={true}
                            />
                        </Container>
                    </Col>
                    <Col className='dark' fluid>
                        <Card body className= 'medium sphnxtext'>
                            What is Sphnx?
                        </Card>
                        <Card body>
                        Sphnx is the exciting new place to test your knowledge and compete with your friends!<br></br><br></br>Join and create platforms about any subject you want, try your best on challenging quizzes and earn points and badges to secure your place on the leaderboard.<br></br><br></br>Tell your friends to check out Sphnx today!<br></br><br></br><br></br>To get started, log in with your Google account.
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}
