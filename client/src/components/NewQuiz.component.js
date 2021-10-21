import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { SketchPicker } from 'react-color';
import { Container } from "react-bootstrap";

export default class NewQuizComponent extends Component {
    constructor(props) {
        super(props)

        // Setting up routes
        this.routeChangePlatform = this.routeChangePlatform.bind(this);

        // Setting up functions
        this.onChangeQuizTitle = this.onChangeQuizTitle.bind(this);
        this.onChangeQuizId = this.onChangeQuizId.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        // Setting up state
        this.state = {
            title: '',
            id: ''
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

    render() {
        //TODO: link Exit button
        return (
            <Container fluid className="sky containerrow">
                <div className="form-wrapper">
                    <Form onSubmit={this.onSubmit}>

                        <div class="medium">
                            <Form.Group controlId="Title">
                                <Form.Label>Title:</Form.Label>
                                <Form.Control type="text" value={this.state.title} onChange={this.onChangeQuizTitle} />
                            </Form.Group>

                            Select Background Image:
                            <div>
                                <Button className="choose-file-button">
                                    Choose File
                                </Button>
                            </div>
                            <div class="dark">
                                Question 1: <input type="text"></input>

                                <div>
                                    Add Question Image: <Button class="choose-file-button"> Choose File </Button> Correct?
                                </div>

                                <div>
                                    Answer: <input type="text"></input>
                                    <input type="checkbox"></input>
                                </div>
                                <div>
                                    Answer: <input type="text"></input>
                                    <input type="checkbox"></input>
                                </div>

                                <div>
                                    <Button class="creationbutton">Add Answer</Button>
                                </div>
                            </div>

                            <div class="text-left">
                                <Button className='addquestion'>
                                    Add Question
                                </Button>
                            </div>

                            <div class="text-right">
                                <Button className='savebutton' type="submit" onClick={this.routeChangePlatform}>
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