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


        // Setting up functions
        // Setting up state
        this.state = {
            isLoggedIn: sessionStorage.getItem('isLoggedIn'),
            questionTitle: '',
            answerNumber: '',
            answerInputArray: []
        }
    }
    componentDidMount(){
        if (this.state.isLoggedIn == "false" || this.state.isLoggedIn == undefined) {
            this.props.history.push('/')
        }
    }
    routeChangePlatform(e) {
        this.props.history.push({
            pathname:'/platform',
            state: {isLoggedIn:true}
            })
    }



    /*
    addAnswerInput() {
        this.setState({ answerInputArray: [...this.state.answerInputArray, ""] })
        this.props.onChange(this.state,this.props.index);
    }
    */
    addAnswerInput = e => {

        this.setState({
            questionTitle: this.props.value.questionTitle,
            answerNumber: this.props.value.answerNumber,
            answerInputArray: this.props.value.answerInputArray?[...this.props.value.answerInputArray, ""]:[""]

        }, () => {
            console.log("inside of addanswerInput" + this.state.answerInputArray)
            if (this.props.onChange) {
                this.props.onChange(this.state, this.props.index);
            }
        })

    }

    onChangeAnswer(e, index) {
        this.state.answerInputArray[index] = e.target.value
        this.setState({ answerInputArray: this.state.answerInputArray })
        this.props.onChange(this.state, this.props.index);
    }
    handleRemove2(index) {
        this.state.answerInputArray.splice(index, 1)

        //console.log(this.state.answerInputArray, "$$$$");

        this.setState({ answerInputArray: this.state.answerInputArray })
        this.props.onChange(this.state, this.props.index);
    }

    handleRemove = index => {
        this.props.value.answerInputArray.splice(index, 1)
        console.log(index)
        this.setState({
            questionTitle: this.props.value.questionTitle,
            answerNumber: this.props.value.answerNumber,
            answerInputArray: this.props.value.answerInputArray

        }, () => {
            console.log("inside of addanswerInput" + this.state.answerInputArray)
            if (this.props.onChange) {
                this.props.onChange(this.state, this.props.index);
            }
        })

    }




    handleChange = e => {

        this.setState({ [e.target.name]: e.target.value }, () => {
            if (this.props.onChange) {
                this.props.onChange(this.state, this.props.index);
            }
        })

    }



    render() {
        //TODO: link Exit button
        return (

            <div className="dark">
                Question {this.props.index+1}: <input value={this.props.value.questionTitle ? this.props.value.questionTitle : ""} type="text" name="questionTitle" onChange={this.handleChange}></input>


                <div>
                    Correct Answer Number(from 0)   : <input value={this.props.value.answerNumber ? this.props.value.answerNumber : ""} type="text" name="answerNumber" onChange={this.handleChange}></input>
                </div>


                {
                    (this.props.value.answerInputArray ? this.props.value.answerInputArray : []).map((input, index) => {
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