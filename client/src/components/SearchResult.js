import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import '../css/SearchResult.css';

export default class SearchResult extends Component{
    constructor(props){
        super(props);
        this.routeChangeHome = this.routeChangeHome.bind(this);
        this.routeChangeProfile = this.routeChangeProfile.bind(this);
        this.routeChangePlatform = this.routeChangePlatform.bind(this);
        this.routeChangeQuiz = this.routeChangeQuiz.bind(this);
    }
    routeChangeHome() {
        //should be  /home/:userid
        this.props.history.push('/home')
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
    render(){
        return (
            <Container fluid className='sky search'>
                <Container className='medium searchcontainer'>
                    <Card body className='title'>
                        Search Results
                    </Card>
                    <Row >
                        <Col md>
                        <Form.Control size = 'sm' type="text" placeholder="You Searched For: " className='light'/>
                        </Col>
                        <Col className='mr-auto'>
                            <Row>
                                <Button onClick={this.routeChangeHome} variant='danger' className='ml-auto buttons'>
                                    Return Home
                                </Button>
                            </Row>
                            <Row>
                                <Button className='ml-auto buttons'>
                                    Filter
                                </Button>
                            </Row>
                        </Col>
                    </Row>
                    <Container className='light searchresult'>
                        <Row className='mr-auto'>
                            <Button onClick={this.routeChangePlatform} className ='marginspacing  mr-auto' variant="primary">
                                Example Platform
                            </Button>
                        </Row>
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
                </Container>
            </Container>
        )
    }
}