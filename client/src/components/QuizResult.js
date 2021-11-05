import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import '../css/QuizResult.css';

export default class QuizResult extends Component{
    constructor(props){
        super(props);
        this.renderQuestions = this.renderQuestions.bind(this);
        this.routeHome = this.routeHome.bind(this);
        this.routePlatform = this.routeHome.bind(this);
    }
    renderQuestions = () => {
        const q = [];
        for(var i =0; i < 11; i++){
            q.push(<Card body>Question {i}:</Card>)
        }
        return q;
    }

    routeHome(){
        this.props.history.push('/home');
    }

    routePlatform(){
        this.props.history.push('/platform');
    }
    render(){
        return(
            <Container fluid className='light resultcontainer'>
                <Container className='ml-auto mr-auto medium resultscore'>
                    <Row>
                        <Button onClick={this.routeHome} className="mr-auto dark routebuttons">
                            Return Home
                        </Button>
                        <Button onClick={this.routePlatform} className="ml-auto dark routebuttons">
                            Return to Platform
                        </Button>
                    </Row>
                    <Row className='justify-content-center'>
                        <Card body> {/*Obtain Quiz Title Param */}
                            Quiz Completed!
                        </Card>
                    </Row>
                    <Row className='justify-content-center'>
                        <Card> {/*Obtain Time Completed Param */}
                            Time Completed 06/06/2021 4:21PM
                        </Card>
                    </Row>
                    <Row className='justify-content-center'>
                        <Card> {/*Obtain Score and Badges Earned */}
                            Score: {this.props.score}/{this.props.numberOfQuestion}     Badge Earned:[  ]
                        </Card>
                    </Row>
                </Container>
                <Container className='dark result'>
                    {
                        this.renderQuestions()
                    }
                </Container>
                <Container>

                </Container>
            </Container>
        )
    }
}