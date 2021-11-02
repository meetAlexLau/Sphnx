import React, { Component } from "react";
//import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
//import Button from 'react-bootstrap/Button';

import exampleBackground from "../img/quizBackgroundExample.png";
import axios from 'axios'

export default class Quiz extends Component {

  constructor(props) {
    super(props)

    // Setting up functions


    // Setting up state
    this.state = {
      isLoggedIn: sessionStorage.getItem('isLoggedIn'),
      quizId: '',
      quizTitle: '',
      backgourndPic: '',
      questionArray: [{ answerInputArray: [] }],
      answerKeyArray: []
    }
  }


  componentDidMount() {
    if (this.state.isLoggedIn !== "true") {
      this.props.history.push('/')
    }
    else {

      axios.get('http://localhost:4000/quizzes/61808e9944a7d8064e72256e/')
        .then(res => {
          this.setState({
            quizId: res.data._id,
            quizTitle: res.data.QuizTitle,
            backgourndPic: res.data.QuizBackground,
            questionArray: res.data.QuizQuestions,
            answerKeyArray: res.data.QuizAnswerKey


          })
        })
    }
    //console.log(this.state)

  }



  //<div className="form-wrapper" style={{ backgroundImage: `url(${quizBackground})` }}>
  //<Button  variant="primary">Next</Button>{' '}
  //backgroundImage: `url(${quizBackground})`
  // <div style={{ backgroundImage: `url("https://s3-alpha-sig.figma.com/img/793b/aa30/5e39f555720dd1019bc2b4bf12dc7715?Expires=1635724800&Signature=WmJcOUAdHownhxyVuHA4dIaYTNHAm4Wleek0KcE7uh8KR6~Bs~gOINKRRjD-cymZwo4SIctR~o2SFkxKNypOWRqfLUHROGQe~y4relxobiHJLjqDX888ajYiFHuIY~Toim7KvmMbq3LrmUC5rs9HmI4pgXqcvrEtA3f2sHCsOTLlShglgG-pad0Bbx-FnChpyDCqqGu1ZVJyF~wI3jIZml4Hs66Xz7NWUEJeBTeUId8W02dh84FHbqQZucRUwSKjVsitMooSWw1KGmSZu0mlxzqxYVyAKEwtUEvT~Xv1NlfXt82A6RqPSOOykqf0Tdgi8paEY38g353GAMMYxVIIEw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA")` }} class="backgorund" >
  //<div style={{ backgroundImage: `url(${exampleBackground})` }} class="backgorund" >
  render() {
    return (

      <div style={{ backgroundImage: `url(${this.state.backgourndPic})` }} className="backgorund" >
        <div className="quiz-content">
          <h1 style={{ textAlign: 'center', fontSize: 20 }}>{this.state.quizTitle}</h1>
          <h2 style={{ fontSize: 15, marginLeft: "5%" }}>Question 1</h2>
          <h2 style={{ fontSize: 15, marginLeft: "5%" }}>{this.state.questionArray[0].questionTitle}</h2>
          {
            /*console.log(this.state.questionArray[0].questionTitle)
            */
          }



          <div style={{ "width": "100%", "display": "table" }}>
            <div style={{ "display": "table-row", "height": "100px" }}>
              <div style={{ "width": "50%", "display": "table-cell", justifyContent: "center", alignItems: "center" }}>

                <div className="form-check" style={{ fontSize: 15, marginLeft: "15%" }}>
                  <label className="form-check-label">
                    <input type="checkbox"

                      className="form-check-input"
                    />
                    {//console.log(this.state.questionArray[0].answerInputArray[0])
                      this.state.questionArray[0].answerInputArray[0]
                    }
                  </label>
                </div>
                <div className="form-check" style={{ fontSize: 15, marginLeft: "15%" }}>
                  <label className="form-check-label">
                    <input type="checkbox"

                      className="form-check-input"
                    />
                    {
                      this.state.questionArray[0].answerInputArray[1]
                    }
                  </label>
                </div>
                <div className="form-check" style={{ fontSize: 15, marginLeft: "15%" }}>
                  <label className="form-check-label">
                    <input type="checkbox"

                      className="form-check-input"
                    />
                    Centrality
                  </label>
                </div>
              </div>
              <div style={{ "display": "table-cell" }}>
                <img style={{ "witdth": "160px", "height": "120px" }} src="https://www.innovationnewsnetwork.com/wp-content/uploads/2020/11/Black-hole-simulations-800x450.jpg" />
              </div>
            </div>
          </div>



          <Link to={"/QuizResult"} className="quiz-button">
            Next
          </Link>
          <Link to={"/QuizResult"} className="quiz-button">
            Back
          </Link>


        </div>
      </div>

    );
  }
}
