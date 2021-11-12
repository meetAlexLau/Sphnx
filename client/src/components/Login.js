require('dotenv').config({ path: '.env' })
import React, {Component} from 'react';
import axios from 'axios';
import GoogleLogin from 'react-google-login';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
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
        this.props.history.push('/home');
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
                        sessionStorage.setItem("id token", resp.tokenId)
                        sessionStorage.setItem("isLoggedIn", true);
                        this.refreshTokenSetup(resp)
                        this.routeChange();
                    }
                    else{                                //NEW USER
                        axios.post('/users/signUp', newUser)
                            .then((res) => {
                                console.log("NEW USER")
                                sessionStorage.setItem('UserID', newUser.UserID)
                                sessionStorage.setItem("id token", resp.tokenId)
                                sessionStorage.setItem("isLoggedIn", true);
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
                                Sphnx 
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
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}
