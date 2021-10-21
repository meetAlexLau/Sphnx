import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import '../App.css';

export default class Home extends Component{
    constructor(props){
        super(props);
        this.routeChangeLogout = this.routeChangeLogout.bind(this);
        this.routeChangeProfile = this.routeChangeProfile.bind(this);
    }
    routeChangeLogout() {
        //should be  /home/:userid
        this.props.history.push('/')
    }
    routeChangeProfile(){
        //should be  /profile/:userid
        this.props.history.push('/profile')
    }
    render(){
        return (
            <Container fluid className='sky containerrow'> {/* home container*/}
                <Row className = 'medium marginspacing paddingspacing'> {/*Logout | Title | Profile */}
                    <Button className='mr-auto gray'onClick={this.routeChangeLogout} variant="primary">
                        Logout
                    </Button>
                    <Card body className='ml-auto mr-auto' style={{width: "25%", textAlign: 'center', fontSize: '25px'}}>
                        Sphnx
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
                        <Row className='mr-auto'>
                            <Button className ='marginspacing  mr-auto' variant="primary">
                                Example Platform
                            </Button>
                        </Row>
                        <Row>
                            <Button className ='marginspacing' variant="primary">
                                Example Quiz
                            </Button>
                        </Row>
                        <Row>
                            <Button className ='marginspacing' variant="primary">
                                Example Profile
                            </Button>
                        </Row>
                    </Container>
                </Row>
            </Container>
        )
    }
}