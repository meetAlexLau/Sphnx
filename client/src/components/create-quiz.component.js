import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { SketchPicker } from 'react-color';

export default class CreateQuiz extends Component {
    constructor(props) {
        super(props)

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

    render(){
        return (<div className="form-wrapper">
            <Form onSubmit={this.onSubmit}>
                <Form.Group controlId="Title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" value={this.state.title} onChange={this.onChangeQuizTitle} />
                </Form.Group>
            </Form>
        </div>);
    }
}