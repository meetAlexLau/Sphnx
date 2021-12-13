import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios'
import QuizResult from "./QuizResult";
import '../css/Quiz.css';
export default class Quiz extends Component {

  constructor(props) {
    var time = new Date()
    super(props)
    // Setting up functions
    this.onClickNext = this.onClickNext.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
    this.onClickSubmit = this.onClickSubmit.bind(this);
    this.onClickBack = this.onClickBack.bind(this)

    // Setting up state
    this.state = {
      isLoggedIn: sessionStorage.getItem('isLoggedIn'),
      quizId: '',
      quizTitle: '',
      backgroundPic: '',
      questionArray: [{ answerInputArray: [] }],
      answerKeyArray: [],
      numberOfQuestion: '',
      userAnswer: [],
      badgeArray:[],
      indexOfQuestion: 0,
      titleOfQuestion: '',
      submitActive: 0,
      ResultActive: 0,
      score: 0,
      startTime: time,
      totalTime: 0,
      platformID: ''
      //arrayOfAnswer: []
    }
  }
  async componentDidMount() {
    if (this.state.isLoggedIn == "false" || this.state.isLoggedIn == undefined) {
      this.props.history.push('/')
    }
    else {
      let currentQuiz = sessionStorage.getItem('current quiz');
      let QuizID = currentQuiz ? currentQuiz : sessionStorage.getItem('previous quiz')
      sessionStorage.setItem('current quiz', sessionStorage.getItem('previous quiz'))

      
      await axios.get('/quizzes/' + QuizID)
        .then(res => {
          const initUserAnswer = []
          for (let i = 0; i < res.data.QuizQuestions.length; i++) {
            initUserAnswer[i] = -1
          }
          this.setState({
            quizId: res.data._id,
            quizTitle: res.data.QuizTitle,
            backgroundPic: res.data.QuizBackground,
            questionArray: res.data.QuizQuestions,
            answerKeyArray: res.data.QuizAnswerKey,
            numberOfQuestion: res.data.QuizQuestions.length,
            userAnswer: initUserAnswer,
            platformID: res.data.PlatformID,
            badgeArray: res.data.QuizBadgeArray,
          })
        })

      await axios.get('/platforms/' + this.state.platformID)
        .then(res => {
          let Platform = res.data
          this.setState({
            oldPlatform: Platform,
            platformName: Platform.PlatformName
          })
        })
      axios.get('/users/UserID/' + sessionStorage.getItem('UserID'))
        .then(res => {
          let User = res.data[0]
          this.setState({
            oldUser: User,
            IDtoEdit: User._id,
            UserName: User.UserName,
            UserPrimaryColor: User.UserPrimaryColor,
            UserSecondaryColor: User.UserSecondaryColor,
            UserPicture: User.UserPicture,
            UserBackgroundPicture: User.UserBackgroundPicture
          })
        })
    }
    //console.log(this.state)
  }

  onClickSubmit() {
    let scoreResult = 0;
    for (let i = 0; i < this.state.numberOfQuestion; i++) {
      if (this.state.userAnswer[i] == this.state.answerKeyArray[i]) {
        scoreResult++
        //console.log("numberOfQuestion is: "+this.state.numberOfQuestion)
        //console.log("user answer is: "+this.state.userAnswer[i]+"  actual answer is:" +this.state.answerKeyArray[i])
        //console.log("scoreResult is: "+scoreResult)
      }
    }
    this.setState({ score: scoreResult })

    var endtime = new Date()
    this.setState({ totalTime: endtime - this.state.startTime })

    this.setState({ ResultActive: 1 })

    let pointsScored = ( (((scoreResult / this.state.numberOfQuestion) * 100) * this.state.numberOfQuestion) + ( (15 - (this.state.totalTime / 1000) * 10) ) )

    var badgesWon = []
    var j = 0;
    let totalTime = this.state.totalTime
    while(this.state.badgeArray[j]){
      let currentBadge = this.state.badgeArray[j]
      if(this.state.oldUser.UserBadgeArray.includes(currentBadge.badgeID)){
      }
      else{
        if(currentBadge.badgeType == 1){
          if(scoreResult >= parseInt(currentBadge.minScore)){
            alert("You have won the badge: '" + currentBadge.badgeTitle + "' for beating the score of " + currentBadge.minScore + '!')
            console.log("You have won the badge: '" + currentBadge.badgeTitle + "' for beating the score of " + currentBadge.minScore + '!')
            badgesWon.push(currentBadge.badgeID)
          }
        }
        else if(currentBadge.badgeType == 2){
          if(totalTime <= parseInt(currentBadge.maxTime)){
            alert("You have won the badge: '" + currentBadge.badgeTitle + "' for beating the time of " + currentBadge.maxTime + '!')
            console.log("You have won the badge: '" + currentBadge.badgeTitle + "' for beating the time of " + currentBadge.maxTime + '!')
            badgesWon.push(currentBadge.badgeID)
          }
        }
        else if(currentBadge.badgeType == 3){
          if(scoreResult == this.state.numberOfQuestion){
            alert("You have won the badge: '"+ currentBadge.badgeTitle + "' for getting a perfect score!")
            console.log("You have won the badge: '"+ currentBadge.badgeTitle + "' for getting a perfect score!")
            badgesWon.push(currentBadge.badgeID)
          }
        }
      }
      j++
    }

    let updatedUser = this.state.oldUser
    updatedUser.UserPoints = updatedUser.UserPoints + pointsScored
    var k = 0;
    while(badgesWon[k]){
      if(updatedUser.UserBadgeArray.includes(badgesWon[k])){
      }
      else{
        updatedUser.UserBadgeArray.push(badgesWon[k])
      }
      k++
    }
    
    const newPath = ('/users/' + this.state.IDtoEdit)

    axios.put(newPath, updatedUser)
      .then(res => console.log(res.data))
      .catch(err => console.log(err))

    //update platform scoreboard-------------
    let updatedPlatform = this.state.oldPlatform

    let obj = updatedPlatform.ScoreBoard.find((o, i) => {
      if (o.userId === this.state.IDtoEdit) {
        let oldRanker = updatedPlatform.ScoreBoard[i]
        updatedPlatform.ScoreBoard[i] = {
          userId: oldRanker.userId, userName: oldRanker.userName,
          point: oldRanker.point + pointsScored
        };
        return true; // stop searching
      }
    });

    console.log(updatedPlatform.ScoreBoard)
    if (obj == undefined) {
      updatedPlatform.ScoreBoard.push({
        userId: this.state.IDtoEdit, userName: this.state.UserName,
        point: pointsScored
      })
    }

    const newPathOfPlatform = ('/platforms/updatePlatform/' + this.state.platformID)

    axios.put(newPathOfPlatform, updatedPlatform)
      .then(res => console.log(res.data))
      .catch(err => console.log(err))

    //update platform scoreboard-------------
  }

  onClickNext() {
    this.setState({ indexOfQuestion: this.state.indexOfQuestion + 1 })
    //console.log(this.state.numberOfQuestion)
    console.log(this.state.indexOfQuestion)
  }

  onClickBack() {
    if (this.state.indexOfQuestion <= 0) {
      this.props.history.goBack()
    } else {
      this.setState({ indexOfQuestion: this.state.indexOfQuestion - 1 })
      console.log(this.state.indexOfQuestion)
    }
  }

  onValueChange(event) {
    //this.setState({selectedOption: event.target.value});
    const tempUserAnswer = this.state.userAnswer
    tempUserAnswer[this.state.indexOfQuestion] = event.target.value
    this.setState({ userAnswer: tempUserAnswer })

  }
  render() {
    return (
      <div>
        {!this.state.ResultActive ? <div key={this.state.indexOfQuestion}>
          <div style={{ backgroundImage: `url(${this.state.backgroundPic})` }} className="quizbackground" >
            <div className="quizcontent">
              <h1 style={{ textAlign: 'center', fontSize: '65px' }}>{this.state.quizTitle}</h1>
              <h2 style={{ fontSize: 15, marginLeft: "5%", fontSize: '45px' }}>Question {this.state.indexOfQuestion + 1}</h2>
              <h2 style={{ fontSize: 15, marginLeft: "5%", fontSize: '45px' }}>{this.state.questionArray[this.state.indexOfQuestion].questionTitle}</h2>
              
              <div style={{ "width": "100%", "display": "table" }}>
                <div style={{ "display": "table-row", "height": "100px" }}>
                  <div style={{ "width": "50%", "display": "table-cell", justifyContent: "center", alignItems: "center" }}>
                    {
                      (this.state.questionArray[this.state.indexOfQuestion].answerInputArray ? this.state.questionArray[this.state.indexOfQuestion].answerInputArray : []).map((input, indexOfAnswer) => {
                        return (
                    
                          <div key={indexOfAnswer} className="radio" style={{ fontSize: 15, marginLeft: "5%", fontSize: '20px' }}>
                            <label>
                              <input
                                type="radio"
                                value={indexOfAnswer}
                                checked={indexOfAnswer == this.state.userAnswer[this.state.indexOfQuestion]}
                                onChange={this.onValueChange}
                              />
                              {input}
                            </label>
                          </div>
                        )
                      })
                    }
                    <div style={{ fontSize: 15, marginLeft: "5%",fontSize: '20px' }}>

                      Selected answer is : {
                        this.state.questionArray[this.state.indexOfQuestion].answerInputArray[this.state.userAnswer[this.state.indexOfQuestion]]
                        //this.state.userAnswer[this.state.indexOfQuestion]
                      }
                    </div>
                  </div>
                </div>
              </div>

              {(this.state.indexOfQuestion < this.state.numberOfQuestion - 1) &&
                <button className="quiz-button" onClick={() => this.onClickNext()}>
                  Next
                </button>
              }

              {(this.state.indexOfQuestion == this.state.numberOfQuestion - 1) &&
                <button className="quiz-button" onClick={() => this.onClickSubmit()}>
                  Submit
                </button>
              }

              <button className="quiz-button" onClick={() => this.onClickBack()}>
                Back
              </button>
            </div>
          </div>
        </div>
        :''}
        {
          this.state.ResultActive ? <QuizResult questionArray={this.state.questionArray} answerKeyArray={this.state.answerKeyArray}
            userAnswer={this.state.userAnswer} score={this.state.score} platformID={this.state.platformID}
            numberOfQuestion={this.state.numberOfQuestion} history={this.props.history} totalTime={this.state.totalTime}
          />:""}
      </div>
    );
  }
}