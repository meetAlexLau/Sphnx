require('dotenv').config();
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
    }
    routeChange() {
        //should be  /home/:userid
        this.props.history.push('/home');
    }
    responseGoogle = (resp) => {
        console.log(resp.tokenId)
        axios.get('https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=' + resp.tokenId)
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
        let profile = resp.profileObj;
        const newUser = {
            UserID: profile.googleId + "",
            UserName: profile.name + (Math.floor(Math.random() * 1000) + 1),
            UserEmail: profile.email,
            UserPoints: 0
        }
        axios.get('http://localhost:4000/users/'+ '617b24975c98b75e931815fc')
            .then((res) => {
                console.log(newUser.UserID)
                this.routeChange(); //change to home screen
            })
        axios.post('http://localhost:4000/users/signUp', newUser)
            .then((res) => {
                console.log(res);
                console.log(newUser.UserID)
                this.routeChange(); //change to home screen
            })
    }
    addUser = (resp) => {
        axios.get('http://localhost:4000/users/617b2b616175b258c227c8b8')
        .then(res => console.log(res.data.UserName));
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
                            />
                            <Button onClick={this.addUser} variant="primary" className = 'medium login'>
                                Login with Google Email
                            </Button>
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