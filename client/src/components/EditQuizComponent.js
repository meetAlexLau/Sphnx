import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
//import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
//import { SketchPicker } from 'react-color';
import { Container } from "react-bootstrap";
import NewBadgeComponent from "./NewBadgeComponent";
import NewQuestionComponent from "./NewQuestionComponent";

const NAME_OF_UPLOAD_PRESET = "sphnxPreset";
const YOUR_CLOUDINARY_ID = "sphnx";

var newIDofQuiz = "";

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


export default class EditQuizComponent extends Component {
    constructor(props) {
        super(props)

        // Setting up routes
        this.routeChangePlatform = this.routeChangePlatform.bind(this);
        this.routeChangeNewBadge = this.routeChangeNewBadge.bind(this);

        // Setting up functions
        this.onChangeQuizTitle = this.onChangeQuizTitle.bind(this);
        this.onChangeQuizId = this.onChangeQuizId.bind(this);
        this.onClickDelete = this.onClickDelete.bind(this);


        this.onSubmit = this.onSubmit.bind(this);

        this.onChangeQuestionArray = this.onChangeQuestionArray.bind(this);


        this.eventhandler = this.eventhandler.bind(this);
        this.eventhandler2 = this.eventhandler2.bind(this);


        // Setting up state
        this.state = {
            isLoggedIn: sessionStorage.getItem('isLoggedIn'),
            title: '',
            backgroundPic: '',
            questionArray: [],
            answerKeyArray: [],
            QuizBadgeArray: [],
            badgeCounter: 0
        }
    }

    async componentDidMount() {
        if (this.props.match.params.isLoggedIn == false) {
            this.props.history.push('/')
        }
        else {


            let currentQuiz = sessionStorage.getItem('current quiz');
            let QuizID = currentQuiz ? currentQuiz : sessionStorage.getItem('previous quiz')
            sessionStorage.setItem('current quiz', sessionStorage.getItem('previous quiz'))


            await axios.get('http://localhost:4000/quizzes/' + QuizID)
                .then(res => {


                    this.setState({
                        quizId: res.data._id,
                        title: res.data.QuizTitle,
                        backgroundPic: res.data.QuizBackground,
                        questionArray: res.data.QuizQuestions,
                        answerKeyArray: res.data.QuizAnswerKey,
                        numberOfQuestion: res.data.QuizQuestions.length,
                        platformID: res.data.PlatformID,
                        QuizBadgeArray: res.data.QuizBadgeArray,
                    })
                })



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
        this.props.history.goBack()
    }

    routeChangeNewBadge(e) {
        this.props.history.push('/newBadge')
    }

    onClickDelete = async() => {

        var r = confirm("Are you sure you want to delete this quiz? This action cannot be undone.")

        if(r == true){
            await axios.delete('http://localhost:4000/quizzes/deleteQuiz/' + this.state.quizId)
            .then(res => {
                console.log('deleted quiz!')
            })
            .catch(err =>{
                console.log(err)
            })


            await axios.get('http://localhost:4000/platforms/' + this.state.platformID)
            .then(res => {
                let Platform = res.data
                const index = Platform.PlatformContentArray.indexOf(this.state.quizId)
                if (index > -1){
                    Platform.PlatformContentArray.splice(index, 1)
                }

                axios.put('http://localhost:4000/platforms/updatePlatform/' + this.state.platformID, Platform).then(res => {})

                this.props.history.push({
                    pathname:'/platform/'+this.state.platformID,
                    state: {isLoggedIn:true}
                    });

                window.location.reload(false)
                
            })
        }
        else{

        }

    }

    onChangeQuizTitle(e) {

        this.setState({ title: e.target.value })
    }

    onChangeQuizId(e) {
        this.setState({ id: e.target.value })
    }

    onSubmit = async (e) => {
        e.preventDefault()
        const answer = []

        let i = 0;
        while (this.state.questionArray[i]) {
            answer.push(this.state.questionArray[i]["answerNumber"]);
            i++;
        }

        let currentPlatform = sessionStorage.getItem('current platform');
        let PlatformID = currentPlatform ? currentPlatform : sessionStorage.getItem('previous platform')
        sessionStorage.setItem('current platform', sessionStorage.getItem('previous platform'))

        var idsOfBadges = []
        var idOfNewBadge = ''
        let j = 0;
       

        const updateQuizObject = {
            QuizTitle: this.state.title,
            QuizBackground: this.state.backgroundPic,
            QuizQuestions: this.state.questionArray,
            QuizAnswerKey: answer,
            PlatformID: this.state.platformID
            //QuizBadgeArray: this.state.QuizBadgeArray
        };



        const editQuizPath = ('http://localhost:4000/quizzes/updateQuiz/' + this.state.quizId)

        await axios.put(editQuizPath, updateQuizObject)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
        this.setState({
            title: '',
            image: '',
            questionArray: [],
            answerKeyArray: []
        });





        //this.props.history.push('/home')
        this.props.history.push({
            pathname: '/platform/' + PlatformID,
            state: { isLoggedIn: true }
        });
        window.location.reload(false)


    }




    addQuestionInput() {
        this.setState({ questionArray: [...this.state.questionArray, ""] })
    }

    addBadgeInput() {
        if (this.state.badgeCounter < 3) {
            this.setState({ QuizBadgeArray: [...this.state.QuizBadgeArray, ""] })
            this.state.badgeCounter++;
        }
        else {

        }
    }

    handleRemoveQuestion(index) {
        this.state.questionArray.splice(index, 1)

        console.log(this.state.questionArray, "$$$$");

        this.setState({ questionArray: this.state.questionArray })
    }

    handleRemoveBadge(index) {
        this.state.QuizBadgeArray.splice(index, 1)

        this.setState({ QuizBadgeArray: this.state.QuizBadgeArray })
        this.state.badgeCounter--;
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

    eventhandler2(data, index) {

        this.state.QuizBadgeArray[index] = data
        this.setState({ QuizBadgeArray: this.state.QuizBadgeArray })

    }

    handleFileChange = async event => {
        const [file] = event.target.files;
        if (!file) return;


        const uploadedUrl = await uploadImage(file);
        console.log(uploadedUrl)
        this.setState({

            backgroundPic: uploadedUrl

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
                            <Button className="choose-file-button" onClick={(e) => this.addBadgeInput(e)}>Add Badge</Button>
                        </div>

                        <div>
                            Select Background Image:
                            <Form.Control type="file" accept='image/*' onChange={this.handleFileChange} />
                            {/*
                                <Button className="choose-file-button">
                                    Choose File
                                </Button>
                                */}
                        </div>

                        {

                            this.state.QuizBadgeArray.map((input, index) => (
                                <div key={index}>
                                    <NewBadgeComponent value={input} onChange={this.eventhandler2} index={index} />

                                    <button onClick={() => this.handleRemoveBadge(index)}>Delete Badge {index + 1}</button>
                                </div>
                            )

                            )



                        }

                        {
                            this.state.questionArray.map((input, index) => (
                                <div key={index}>
                                    <NewQuestionComponent value={input} onChange={this.eventhandler} index={index} />

                                    <button onClick={() => this.handleRemoveQuestion(index)}>delete Question {index + 1}</button>
                                </div>
                            )

                            )


                        }


                        <div>
                            <Button className="choose-file-button" onClick={(e) => this.addQuestionInput(e)}>Add Question</Button>
                        </div>




                        <div className="text-right">
                            <Button className='savebutton' type="submit" onClick={this.onSubmit}>
                                Save
                            </Button>

                            <Button className='cancelbutton' variant="danger" onClick={this.routeChangePlatform}>
                                Cancel
                            </Button>

                            <Button className ='cancelbutton' variant='danger' onClick={this.onClickDelete}>
                                Delete Quiz
                            </Button>
                        </div>
                    </div>



                </div>
            </Container>);
    }
}