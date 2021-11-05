import React, { Component } from "react";
//import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
//import Button from 'react-bootstrap/Button';

//import exampleBackground from "../img/quizBackgroundExample.png";
import axios from 'axios'


export default class Quiz extends Component {

  constructor(props) {
    super(props)

    // Setting up functions
    this.onClickNext = this.onClickNext.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
    // Setting up state
    this.state = {
      isLoggedIn: sessionStorage.getItem('isLoggedIn'),
      quizId: '',
      quizTitle: '',
      backgourndPic: '',
      questionArray: [{ answerInputArray: [] }],
      answerKeyArray: [],
      numberOfQuestion: '',
      userAnswer: [],
      indexOfQuestion: 0,
      titleOfQuestion: '',
      tempAnswer: ''
      //arrayOfAnswer: []
    }
  }


  componentDidMount() {
    if (this.state.isLoggedIn !== "true") {
      this.props.history.push('/')
    }
    else {

      axios.get('http://localhost:4000/quizzes/6182b0b76ad37b02b34dd10e/')
        .then(res => {

          const initUserAnswer=[]
          for (let i = 0; i < res.data.QuizQuestions.length; i++) {
            initUserAnswer[i]=-1
          }

          this.setState({
            quizId: res.data._id,
            quizTitle: res.data.QuizTitle,
            backgourndPic: res.data.QuizBackground,
            questionArray: res.data.QuizQuestions,
            answerKeyArray: res.data.QuizAnswerKey,
            numberOfQuestion: res.data.QuizQuestions.length,
            userAnswer:initUserAnswer

          })
        })
    }
    //console.log(this.state)

  }


  onClickNext() {
    if (this.state.indexOfQuestion >= this.state.numberOfQuestion - 1) {
      this.props.history.push('/QuizResult')
    } else {
      this.setState({ indexOfQuestion: this.state.indexOfQuestion + 1 })
      //console.log(this.state.numberOfQuestion)
      console.log(this.state.indexOfQuestion)
    }
  }
  onClickBack() {

    if (this.state.indexOfQuestion <= 0) {
      console.log(this.state.indexOfQuestion)
    } else {
      this.setState({ indexOfQuestion: this.state.indexOfQuestion - 1 })
      console.log(this.state.indexOfQuestion)

    }


  }

  onValueChange(event) {
    //this.setState({selectedOption: event.target.value});
    const tempUserAnswer=this.state.userAnswer
    tempUserAnswer[this.state.indexOfQuestion]=event.target.value
    this.setState({ userAnswer: tempUserAnswer })

  }
  //<div className="form-wrapper" style={{ backgroundImage: `url(${quizBackground})` }}>
  //<Button  variant="primary">Next</Button>{' '}
  //backgroundImage: `url(${quizBackground})`
  // <div style={{ backgroundImage: `url("https://s3-alpha-sig.figma.com/img/793b/aa30/5e39f555720dd1019bc2b4bf12dc7715?Expires=1635724800&Signature=WmJcOUAdHownhxyVuHA4dIaYTNHAm4Wleek0KcE7uh8KR6~Bs~gOINKRRjD-cymZwo4SIctR~o2SFkxKNypOWRqfLUHROGQe~y4relxobiHJLjqDX888ajYiFHuIY~Toim7KvmMbq3LrmUC5rs9HmI4pgXqcvrEtA3f2sHCsOTLlShglgG-pad0Bbx-FnChpyDCqqGu1ZVJyF~wI3jIZml4Hs66Xz7NWUEJeBTeUId8W02dh84FHbqQZucRUwSKjVsitMooSWw1KGmSZu0mlxzqxYVyAKEwtUEvT~Xv1NlfXt82A6RqPSOOykqf0Tdgi8paEY38g353GAMMYxVIIEw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA")` }} class="backgorund" >
  //<div style={{ backgroundImage: `url(${exampleBackground})` }} class="backgorund" >
  render() {
    return (

      <div key={this.state.indexOfQuestion}>
        <div style={{ backgroundImage: `url(${this.state.backgourndPic})` }} className="backgorund" >
          <div className="quiz-content">

            <h1 style={{ textAlign: 'center', fontSize: 20 }}>{this.state.quizTitle}</h1>
            <h2 style={{ fontSize: 15, marginLeft: "5%" }}>Question {this.state.indexOfQuestion + 1}</h2>
            <h2 style={{ fontSize: 15, marginLeft: "5%" }}>{this.state.questionArray[this.state.indexOfQuestion].questionTitle}</h2>
            {
              /*console.log(this.state.questionArray[0].questionTitle)
              */
            }




            <div style={{ "width": "100%", "display": "table" }}>
              <div style={{ "display": "table-row", "height": "100px" }}>
                <div style={{ "width": "50%", "display": "table-cell", justifyContent: "center", alignItems: "center" }}>

                
                  {
                    (this.state.questionArray[this.state.indexOfQuestion].answerInputArray ? this.state.questionArray[this.state.indexOfQuestion].answerInputArray : []).map((input, index) => {
                      return (
                        /*
                        <div key={index}>
                          <div className="form-check" style={{ fontSize: 15, marginLeft: "15%" }}>
                            <label className="form-check-label">
                              <input type="checkbox" className="form-check-input" />
                              {input}
                            </label>
                          </div>
                        </div>
                        */

                        <div className="radio" style={{ fontSize: 15, marginLeft: "5%" }}>
                          <label>
                            <input
                              type="radio"
                              value={index}
                              checked={index == this.state.userAnswer[this.state.indexOfQuestion]}
                              onChange={this.onValueChange}
                            />
                            {input}
                          </label>
                        </div>
                      )
                    })
                  }
                  <div style={{ fontSize: 15, marginLeft: "5%" }}>
                    Selected option is : {this.state.userAnswer[this.state.indexOfQuestion]}
                  </div>

                  

                </div>
                {/*
              <div style={{ "display": "table-cell" }}>
                <img style={{ "witdth": "160px", "height": "120px" }} src="https://www.innovationnewsnetwork.com/wp-content/uploads/2020/11/Black-hole-simulations-800x450.jpg" />
              </div>
              */}
              </div>
            </div>



            <button className="quiz-button" onClick={() => this.onClickNext()}>
              Next
            </button>
            <button className="quiz-button" onClick={() => this.onClickBack()}>
              Back
            </button>

            {/*
          <Link to={"/QuizResult"} className="quiz-button">
            Back
          </Link>
          */
            }

          </div>
        </div>
      </div>
    );
  }
}
