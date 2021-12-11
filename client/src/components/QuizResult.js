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
        this.routePlatform = this.routePlatform.bind(this);
        this.state = {
            isLoggedIn: sessionStorage.getItem('isLoggedIn')
        }
    }
    componentDidMount(){
        if (this.state.isLoggedIn == "false" || this.state.isLoggedIn == undefined) {
            this.props.history.push('/')
        }
    }
    renderQuestions = () => {
        const q = [];
        for(var i =0; i < this.props.numberOfQuestion; i++){
            q.push(<Card body key={i}>Question {i+1}: {this.props.questionArray[i].questionTitle}
                    {"  [Your Answer: " }
                    {this.props.questionArray[i].answerInputArray[this.props.userAnswer[i]] }
                    {"]" }
                    {"  [Correct Answer: " }
                    {this.props.questionArray[i].answerInputArray[this.props.answerKeyArray[i]] }
                    {"]" }
            </Card>)
        }
        return q;
    }

    routeHome(){
        this.props.history.push({
            pathname:'/home',
            state: {isLoggedIn:true}
            });
    }

    /*
    routePlatform(){
        console.log("platform Id is"+this.props.platformID)
        this.props.history.push('/platform/'+this.props.platformID);
    }*/


    routePlatform() {
        //should be  /profile/:userid
        sessionStorage.setItem('current platform', this.props.platformID);
        sessionStorage.setItem('previous platform', this.props.platformID);
        this.props.history.push({
            pathname:'/platform/' + this.props.platformID,
            state: {isLoggedIn:true}
            });
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
                            {this.props.totalTime/1000} Second to take the quiz
                        </Card>
                    </Row>
                    <Row className='justify-content-center'>
                        <Card> {/*Obtain Score and Badges Earned */}
                            Score: {this.props.score}/{this.props.numberOfQuestion} 
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