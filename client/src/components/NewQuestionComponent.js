import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
//import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
//import { SketchPicker } from 'react-color';
import { Container } from "react-bootstrap";

export default class NewQuestionComponent extends Component {
    constructor(props) {
        super(props)

        // Setting up routes
        this.routeChangePlatform = this.routeChangePlatform.bind(this);

        this.onChangeQuestionTitle = this.onChangeQuestionTitle.bind(this);
        this.onChangeAnswerNumber = this.onChangeAnswerNumber.bind(this);
        // Setting up functions
        // Setting up state
        this.state = {
            questionTitle: '',
            answerNumber: '',
            answerInputArray: []
        }
    }

    routeChangePlatform(e) {
        this.props.history.push('/platform')
    }




    addAnswerInput() {
        this.setState({ answerInputArray: [...this.state.answerInputArray, ""] })
    }
    onChangeAnswer(e, index) {
        this.state.answerInputArray[index] = e.target.value
        this.setState({ answerInputArray: this.state.answerInputArray })
        this.props.onChange(this.state,this.props.index);
    }
    handleRemove(index) {
        this.state.answerInputArray.splice(index, 1)

        console.log(this.state.answerInputArray, "$$$$");

        this.setState({ answerInputArray: this.state.answerInputArray })
        this.props.onChange(this.state,this.props.index);
    }

    onChangeQuestionTitle(e) {


        //this.state.questionArray[index] = e.target.value
        //this.setState({ questionArray: this.state.questionArray })


        this.setState({ QuestionTitle: e.target.value })

        this.props.onChangeQuestion(e, this.props.index)
    }


    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value }, () => {
            if (this.props.onChange) {
                this.props.onChange(this.state,this.props.index);
            }
        })
    }



    onChangeAnswerNumber(e) {

        this.setState({ QuestionTitle: e.target.value })
    }
    render() {
        //TODO: link Exit button
        return (

            <div className="dark">
                Question {this.props.index}: <input type="text" name="questionTitle" onChange={this.handleChange}></input>


                <div>
                    Correct Answer Number(from 0)   : <input type="text" name="answerNumber"  onChange={this.handleChange}></input>
                </div>


                {
                    this.state.answerInputArray.map((input, index) => {
                        return (
                            <div key={index}>
                                Answer {index}: <input onChange={(e) => this.onChangeAnswer(e, index)} value={input} />

                                <button onClick={() => this.handleRemove(index)}>delete</button>
                            </div>
                        )
                    })
                }

                <div>
                    <Button className="choose-file-button" onClick={(e) => this.addAnswerInput(e)}>Add Answer</Button>
                </div>
            </div>


        );
    }
}