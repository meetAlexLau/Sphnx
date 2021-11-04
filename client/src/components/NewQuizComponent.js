import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
//import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
//import { SketchPicker } from 'react-color';
import { Container } from "react-bootstrap";
import NewQuestionComponent from "./NewQuestionComponent";

const NAME_OF_UPLOAD_PRESET = "sphnxPreset";
const YOUR_CLOUDINARY_ID = "sphnx";

async function uploadImage(file) {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", NAME_OF_UPLOAD_PRESET);
    const res = await fetch(
        `https://api.cloudinary.com/v1_1/${YOUR_CLOUDINARY_ID}/image/upload`,
        {
            method: "POST",
            body: data
        }
    );
    const img = await res.json();
    console.log(img);
    return img.secure_url;
}


export default class NewQuizComponent extends Component {
    constructor(props) {
        super(props)

        // Setting up routes
        this.routeChangePlatform = this.routeChangePlatform.bind(this);

        // Setting up functions
        this.onChangeQuizTitle = this.onChangeQuizTitle.bind(this);
        this.onChangeQuizId = this.onChangeQuizId.bind(this);


        this.onClickSave = this.onClickSave.bind(this);

        this.onChangeQuestionArray = this.onChangeQuestionArray.bind(this);


        this.eventhandler = this.eventhandler.bind(this);


        // Setting up state
        this.state = {
            isLoggedIn: sessionStorage.getItem('isLoggedIn'),
            title: '',
            backgourndPic: '',
            questionArray: [],
            answerKeyArray: []
        }
    }

    componentDidMount() {
        if (this.state.isLoggedIn !== "true") {
            this.props.history.push('/')
        }
        else{
            
            axios.get('http://localhost:4000/users/UserID/' + sessionStorage.getItem('UserID'))
             .then(res => {
              let User = res.data[0];
                this.setState({
                    oldUser: User,
                    IDtoEdit: User._id
                })
            })
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

        let updatedUser = this.state.oldUser
        updatedUser.UserPoints = updatedUser.UserPoints + 10


        const quizObject = {
            QuizTitle: this.state.title,
            QuizID: "Manuel Song",
            QuizBackground: this.state.backgourndPic,
            QuizQuestions: this.state.questionArray,
            QuizAnswerKey: answer

        };

        axios.post(' http://localhost:4000/quizzes/createQuiz', quizObject)
            .then(res => console.log(res.data));

        const newPath = ('http://localhost:4000/users/'+this.state.IDtoEdit)
    
        axios.put(newPath, updatedUser)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
        this.setState({
            title: '',
            image: '',
            questionArray: [],
            answerKeyArray: []
        });


        this.props.history.push('/platform')
        window.location.reload(false)
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
        //console.log(this.state.questionArray)
    }

    /*eventhandler = data => console.log(data)

    eventhandler(data){ console.log(data)

    }*/

    eventhandler(data, index) {
        //console.log("index is " + index)
        this.state.questionArray[index] = data
        this.setState({ questionArray: this.state.questionArray })
        //console.log(this.state.questionArray)

    }

    handleFileChange = async event => {
        const [file] = event.target.files;
        if (!file) return;


        const uploadedUrl = await uploadImage(file);
        console.log(uploadedUrl)
        this.setState({

            backgourndPic: uploadedUrl

        })

    };


    render() {
        //TODO: link Exit button
        return (
            <Container fluid className="sky containerrow">
                <div className="form-wrapper">


                    <div className="medium">
                        <Form.Group controlId="Title">
                            <Form.Label>Title:</Form.Label>
                            <Form.Control type="text" value={this.state.title} onChange={this.onChangeQuizTitle} />
                        </Form.Group>

                        <div>
                            Select Background Image:
                            <Form.Control type="file" accept='image/*' onChange={this.handleFileChange} />
                            {/*
                                <Button className="choose-file-button">
                                    Choose File
                                </Button>
                                */}
                        </div>

                        {/*}
                            <div>
                                <NewQuestionComponent />

                            </div>
                            */}

                        {
                            this.state.questionArray.map((input, index) => (
                                <div key={index}>
                                    <NewQuestionComponent value={input} onChange={this.eventhandler} index={index} />

                                    <button onClick={() => this.handleRemoveQuestion(index)}>delete Question {index}</button>
                                </div>
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



                </div>
            </Container>);
    }
}