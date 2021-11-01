import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
//import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
//import { SketchPicker } from 'react-color';
import { Container } from "react-bootstrap";
import NewQuestionComponent from "./NewQuestionComponent";

export default class NewQuizComponent extends Component {
    constructor(props) {
        super(props)

        // Setting up routes
        this.routeChangePlatform = this.routeChangePlatform.bind(this);

        // Setting up functions
        this.onChangeQuizTitle = this.onChangeQuizTitle.bind(this);
        this.onChangeQuizId = this.onChangeQuizId.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.onClickSave = this.onClickSave.bind(this);

        this.onChangeQuestionArray = this.onChangeQuestionArray.bind(this);


        this.eventhandler = this.eventhandler.bind(this);


        // Setting up state
        this.state = {
            isLoggedIn: sessionStorage.getItem('isLoggedIn'),
            title: '',
            image: '',
            questionArray: [],
            answerKeyArray: []
        }
    }

    componentDidMount() {
        if(this.state.isLoggedIn !== "true"){
            this.props.history.push('/')
        }
    }

    routeChangePlatform(e) {
        this.props.history.push('/platform')
    }

    onChangeQuizTitle(e) {

        this.setState({ title: e.target.value })
    }

    onChangeQuizId(e) {
        this.setState({ id: e.target.value })
    }

    onClickSave(e) {
        e.preventDefault()
        const answer = []
      
        let i = 0;
        while (this.state.questionArray[i]) {
            answer.push(this.state.questionArray[i]["answerNumber"]); 
            i++;
        }


        const quizObject = {
            QuizTitle: this.state.title,
            QuizID:"Manuel Song",
            QuizBackground: this.state.image,
            QuizQuestions: this.state.questionArray,
            QuizAnswerKey: answer

        };

        axios.post(' http://localhost:4000/quizzes/createQuiz', quizObject)
            .then(res => console.log(res.data));

        this.setState({
            title: '',
            image: '',
            questionArray: [],
            answerKeyArray: []
        });


        this.props.history.push('/platform')
    }

    onSubmit(e) {
        e.preventDefault()

        const quizObject = {
            title: this.state.title,
            id: this.state.id
        }

        //axios.post

        this.setState({
            title: '',
            id: ''
        });
    }


    addQuestionInput() {
        this.setState({ questionArray: [...this.state.questionArray, ""] })
    }

    handleRemoveQuestion(index) {
        this.state.questionArray.splice(index, 1)

        console.log(this.state.questionArray, "$$$$");

        this.setState({ questionArray: this.state.questionArray })
    }




    onChangeQuestionArray(e, index) {
        this.state.questionArray[index] = e.target.value
        this.setState({ questionArray: this.state.questionArray })
        console.log(this.state.questionArray)
    }

    /*eventhandler = data => console.log(data)

    eventhandler(data){ console.log(data)

    }*/

    eventhandler(data, index) {
        console.log("index is " + index)
        this.state.questionArray[index] = data
        this.setState({ questionArray: this.state.questionArray })
        console.log(this.state.questionArray)

    }
    render() {
        //TODO: link Exit button
        return (
            <Container fluid className="sky containerrow">
                <div className="form-wrapper">
                    <Form onSubmit={this.onSubmit}>

                        <div className="medium">
                            <Form.Group controlId="Title">
                                <Form.Label>Title:</Form.Label>
                                <Form.Control type="text" value={this.state.title} onChange={this.onChangeQuizTitle} />
                            </Form.Group>

                            <div>
                                Select Background Image:
                                <Button className="choose-file-button">
                                    Choose File
                                </Button>
                            </div>

                            {/*}
                            <div>
                                <NewQuestionComponent />

                            </div>
                            */}

                            {
                                this.state.questionArray.map((input, index) => (
                                    <>
                                        <NewQuestionComponent key={input} questionArray={this.state.questionArray} onChange={this.eventhandler} index={index} />

                                        <button onClick={() => this.handleRemoveQuestion(index)}>delete</button>
                                    </>
                                )

                                )


                            }


                            <div>
                                <Button className="choose-file-button" onClick={(e) => this.addQuestionInput(e)}>Add Question</Button>
                            </div>




                            <div className="text-right">
                                <Button className='savebutton' type="submit" onClick={this.onClickSave}>
                                    Save
                                </Button>

                                <Button className='cancelbutton' variant="danger" onClick={this.routeChangePlatform}>
                                    Cancel
                                </Button>
                            </div>
                        </div>

                    </Form>

                </div>
            </Container>);
    }
}