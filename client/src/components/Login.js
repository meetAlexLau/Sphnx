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
        let profile = resp.profileObj;
        const newUser = {
            UserID: profile.googleId,
            UserName: profile.name + (Math.floor(Math.random() * 1000) + 1),
            UserEmail: profile.email,
            UserPoints: 0,
            UserCoins: 0
        }
        axios.post('http://localhost:4000/Users', newUser).then(res => console.log(res.data));
        this.routeChange()

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
                            <Button onClick={this.routeChange} variant="primary" className = 'medium login'>
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