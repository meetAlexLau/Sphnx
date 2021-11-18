import React, { Component } from "react";

import { Link } from 'react-router-dom';

import { Form, Col, Row, Container, Button } from "react-bootstrap";
import axios from 'axios';
import Card from 'react-bootstrap/Card';

import PlatformLeaderboardComponent from "./PlatformLeaderboardComponent";
import PlatformBadgeComponent from "./PlatformBadgeComponent";

export default class Platform extends Component {

  constructor(props) {
    super(props)
    this.renderSubscribe = this.renderSubscribe.bind(this);
    this.clickNewQuiz = this.clickNewQuiz.bind(this)
    this.clickNewPost = this.clickNewPost.bind(this)

    this.state = {
      isLoggedIn: sessionStorage.getItem('isLoggedIn'),
      PlatformID: '',
      PlatformColor1: '#',
      PlatformColor2: '#',
      PlatformName: '',
      PlatformDesc: '',
      //PlatformPicture: `url("https://s3-alpha-sig.figma.com/img/00af/4155/29de19f4df8c2a4e41bb723fd95362e2?Expires=1635724800&Signature=PVA11EFkHmq5xt7imvZ89GSsvZWKadADlM0dqBwbYrXAd2UNVK0fssovN~EqEl0efWVO7s7ZPLhU5gEThaEZkWcCEvQ8SPWJ~EtEfErJAuZrxYZIMElKKdo4qq7~sys5s4CEbV1G-lR3Af2QBqz3vgMKUz2zaKZB3vQCE5VYtEVCtViB3J500MXdymu9Xj386~TrqvAXtNcEuWr5UD2nkwVjQjk9EWhNJ-zDOo1SxE71te15fXpJOda7GrFQAm8OAV0rbyRtAuzuXNnJC1GyULEaVJ5FYYZt4np~2jRXuP5HgDgoi1riOPDJG08IwUozIkiQ7WoCMXPilMEF6z5V3g__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA")`
      PlatformPicture: '',
      //PlatformPicture: `url(https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8&w=1000&q=80)`
      Quizzes: [],
      Posts: [],
      Subscribed: '',
      UserID: '',
      ScoreBoard: [],
      platformFeed: 1,
      lederboardScreen: 0,
      viewAllbadgeScreen: 0,
      Creator: ''
    }

  }
  componentWillUnmount() {
    sessionStorage.removeItem('current platform')
  }
  componentDidMount = async () => {
    //get UserID to check if they are subscribed
    let getUserID = sessionStorage.getItem('UserID');
    // Persistent Platform when using <back or forward> buttons
    let currentPlatform = sessionStorage.getItem('current platform');
    let PlatformID = currentPlatform ? currentPlatform : sessionStorage.getItem('previous platform')
    sessionStorage.setItem('current platform', sessionStorage.getItem('previous platform'))
    //
    if (this.state.isLoggedIn !== "true") {
      this.props.history.push('/')
    }
    else {
      await axios.get('http://localhost:4000/platforms/' + PlatformID)
        .then(res => {
          //console.log(sessionStorage.getItem('current platform'));
          //console.log('logging res', res);
          this.setState({
            PlatformID: res.data.PlatformID,
            PlatformName: res.data.PlatformName,
            PlatformPicture: res.data.PlatformPicture,
            PlatformColor1: res.data.PlatformColor1,
            PlatformColor2: res.data.PlatformColor2,
            PlatformDesc: res.data.PlatformDesc,
            ScoreBoard: res.data.ScoreBoard,
            Creator: res.data.PlatformCreator,
          })
        })
      this.getQuizzes(this.state.PlatformID);
      this.getPosts(this.state.PlatformID);

      //CHECK IF USER IS SUBSCRIBED
      await axios.get('http://localhost:4000/users/UserID/' + getUserID)
        .then(res => {

          //x = get UserSubscribedPlatformArray, .find(PlatformID)
          //if (x) {this.state.Subscribed = true} else {= false}
          let subscribeFlag = res.data[0].UserSubscribedPlatformArray.find(id => id == PlatformID);   //flag = if user is subscribed
          if (typeof subscribeFlag === 'undefined') subscribeFlag = false;
          else subscribeFlag = true;
          this.setState({
            Subscribed: subscribeFlag
          })
        })
    }

  }

  routeChangeQuiz = (QuizID) => {
    sessionStorage.setItem('current quiz', QuizID);
    sessionStorage.setItem('previous quiz', QuizID);
    this.props.history.push('/quiz/' + QuizID);
  }

  routeChangePost = (PostID) => {
    sessionStorage.setItem('current post', PostID);
    sessionStorage.setItem('previous post', PostID);
    this.props.history.push('/post/' + PostID);
  }

  // get this platform's quizzes
  getQuizzes = async (PlatformID) => {
    let q = [];
    let plat;

    // get platformquizarray from this platform
    await axios.get('http://localhost:4000/platforms/' + PlatformID)
      .then(res => {
        plat = res.data;
      })

    // iterate through and get all quizzes
    for (let i = 0; i < plat.PlatformQuizArray.length; i++) {
      try {
        await axios.get('http://localhost:4000/quizzes/' + plat.PlatformQuizArray[i])
          .then(res => {
            q.push(res.data);
            this.setState({
              Quizzes: this.state.Quizzes.concat([q[i]])
            })
          })
      } catch (err) {
        console.log(err);
      }
    }
    //console.log(this.state.Quizzes);
  }
 //////copy about for post-----------------------------------------------------------
  getPosts = async (PlatformID) => {
    let q = [];
    let plat;

    // get platformpostarray from this platform
    await axios.get('http://localhost:4000/platforms/' + PlatformID)
      .then(res => {
        plat = res.data;
      })

    // iterate through and get all posts
    for (let i = 0; i < plat.PlatformPostArray.length; i++) {
      try {
        await axios.get('http://localhost:4000/posts/' + plat.PlatformPostArray[i])
          .then(res => {
            q.push(res.data);
            this.setState({
              Posts: this.state.Posts.concat([q[i]])
            })
          })
      } catch (err) {
        console.log(err);
      }
    }
  
  }
  //////-----------------------------------------------------------------------




  renderSubscribe() {
    if (document.getElementById('subscribe'))
      if (this.state.Subscribed == true) {
        document.getElementById('subscribe').innerHTML = 'unsubscribe';
      }
      else if (this.state.Subscribed == false) {
        document.getElementById('subscribe').innerHTML = 'subscribe'
      }
  }
  subscribeDisplay() {
    if (this.state.Subscribed == true) {
      document.getElementById('subscribe').innerHTML = 'subscribe'
      alert("You are now unsubscribed to " + this.state.PlatformName);
    }
    else if (this.state.Subscribed == false) {
      document.getElementById('subscribe').innerHTML = 'unsubscribe'
      alert("You are now subscribed to " + this.state.PlatformName)
    }
  }
  subscribeToPlatform = async () => {
    this.subscribeDisplay(); //change Un/Subscribed button
    let getUserID = sessionStorage.getItem('UserID');
    let PlatformID = this.state.PlatformID;
    let plat, user;
    await axios.get('http://localhost:4000/platforms/' + PlatformID)  //Get Platform Subscriber Array
      .then(res => {
        plat = res.data;
      })
    await axios.get('http://localhost:4000/users/UserID/' + getUserID) //Get User Subscribed Platform Array
      .then(res => {
        user = res.data[0];
      })

    if (this.state.Subscribed == true) { //User is ALREADY SUBSCRIBED, they want to UNSUBSCRIBE
      let i = plat.PlatformSubscriberArray.indexOf(plat.PlatformSubscriberArray.find(arr => arr.includes(user._id)));
      plat.PlatformSubscriberArray[i][2] = false;

      //Updating User UserSubscribedPlatformArray
      let tempUserSubPlatArr = user.UserSubscribedPlatformArray;
      console.log(PlatformID);
      user.UserSubscribedPlatformArray = tempUserSubPlatArr.filter(function (value) {
        console.log(value);
        return value !== PlatformID;
      });
    }
    else {   //User is NOT SUBSCRIBED, they want to SUBSCRIBE
      let subscribedUser = [user._id, user.UserName, true]
      if (plat.PlatformSubscriberArray.find(arr => arr.includes(user._id))) { //if is already in array but is not subscribed
        let i = plat.PlatformSubscriberArray.indexOf(plat.PlatformSubscriberArray.find(arr => arr.includes(user._id)));
        plat.PlatformSubscriberArray[i][2] = true;
      }
      else {
        plat.PlatformSubscriberArray.push(subscribedUser);
      }
      user.UserSubscribedPlatformArray.push(PlatformID);
    }
    this.setState({
      Subscribed: !this.state.Subscribed
    })
    //Updating Platform PlatformSubscriberArray
    // [(userMongoId, username, points, timespentonplatform, isSubscribed)]
    await axios.put('http://localhost:4000/platforms/updatePlatform/' + PlatformID, plat)
      .then(res => console.log("User Subscribe Arr:", res))
      .catch(err => console.log("User Subscribe Arr Err:", err));

    //Updating User UserSubscribedPlatformArray
    await axios.put('http://localhost:4000/users/' + user._id, user)
      .then(res => console.log("User Subscribe Arr:", res))
      .catch(err => console.log("User Subscribe Arr Err:", err))
  }


  onClickLeaderboard() {
    this.setState({
      platformFeed: 0,
      lederboardScreen: 1,
      viewAllbadgeScreen: 0
    })
  }
  onClickPlatformHome() {
    this.setState({
      platformFeed: 1,
      lederboardScreen: 0,
      viewAllbadgeScreen: 0
    })
  }
  onClickViewAllbadges() {
    this.setState({
      platformFeed: 0,
      lederboardScreen: 0,
      viewAllbadgeScreen: 1
    })
  }

  clickNewQuiz() {
    console.log(this.state.Creator)
    console.log(sessionStorage.getItem('UserID'))
    if (this.state.Creator == sessionStorage.getItem('UserID')) {
      this.props.history.push('/newQuiz')
    }
    else {

    }
  }

  clickNewPost() {
    console.log(this.state.Creator)
    console.log(sessionStorage.getItem('UserID'))
    if (this.state.Creator == sessionStorage.getItem('UserID')) {
      this.props.history.push('/newPost')
    }
    else {

    }
  }


  render() {
    //
    //Quiz grid
    let quizs = this.state.Quizzes?.map((quiz, i) => (
      <Col key={i}>
        <Card className='ml-auto activityCard'>
          <Card.Img variant='top' className='activityCardImage' src={quiz.QuizBackground}></Card.Img>
          <Button className='activityCardButton' onClick={() => this.routeChangeQuiz(quiz._id)} variant="primary">
            {quiz.QuizTitle}
          </Button>
        </Card>
      </Col>

    ))
    //console.log(quizs);
    let rendquizs = [];
    while (quizs.length > 0) {        //splice the array of platforms into groups of 4
      let chunk = quizs.splice(0, 4);
      rendquizs.push(chunk)
    }
    //console.log(rendquizs)
    for (var j = 0; j < rendquizs.length; j++) {          //each chunk is a group of 4, surround with <Row>
      rendquizs[j] = <Row> {rendquizs[j]} </Row>
    }

    //copy above for post---------------------------------------------------------------------------------
      //console.log(this.state.Posts)
    let posts = this.state.Posts?.map((post, i) => (
      <Col key={i}>
        <Card className='ml-auto activityCard'>
          <Card.Img variant='top' className='activityCardImage' src={post.PostPicture}></Card.Img>
          <Button className='activityCardButton' onClick={() => this.routeChangePost(post._id)} variant="primary">
            {post.PostTitle}
          </Button>
        </Card>
      </Col>

    ))
  
    let rendposts = [];
    while (posts.length > 0) {        //splice the array of platforms into groups of 4
      let chunk = posts.splice(0, 4);
      rendposts.push(chunk)
    }
   
    for (var j = 0; j < rendposts.length; j++) {          //each chunk is a group of 4, surround with <Row>
      rendposts[j] = <Row> {rendposts[j]} </Row>
    }


    //copy ---------------------------------------------------------------------------------



    return (


      <div className="platform-background" style={{ backgroundImage: 'url(' + this.state.PlatformPicture + ')' }} >



        <div className="platform-content" style={{ backgroundColor: this.state.PlatformColor1 }}>
          <div className="platform-content-header" style={{ backgroundColor: this.state.PlatformColor2 }}>

            <Container>
              <Row>
                <Col>
                  <Row>
                    <button className="platform-left-button" onClick={() => this.onClickLeaderboard()}>
                      Leaderboard
                    </button>


                    <Link to={"/home"} className="platform-home-button"></Link>
                  </Row>
                  <Row>
                    <button className="platform-left-button" onClick={() => this.onClickViewAllbadges()}>
                      View All Badges
                    </button>


                    <button className="platform-left-button" onClick={() => this.onClickPlatformHome()}>
                      Platform Home
                    </button>
                  </Row>
                </Col>

                <Col>
                  <Row className="d-flex justify-content-center" style={{ fontSize: "20px" }}>Platform</Row>
                  <Row className="d-flex justify-content-center" style={{ fontSize: "40px" }}>{this.state.PlatformName}</Row>
                </Col>

                <Col >

                  <Row className="d-flex justify-content-end">
                    <Button id="subscribe"
                      to={"/"}
                      onClick={() => this.subscribeToPlatform()}
                      className="platform-right-button"
                      style={{ backgroundColor: "#E79696" }}
                    >
                      {
                        this.renderSubscribe()
                      }
                    </Button>
                  </Row>
                  <Row className="d-flex justify-content-end"><Button onClick={this.clickNewQuiz} className="platform-right-button" style={{ backgroundColor: "#9C9C9C" }}>New Quiz</Button></Row>
                  <Row className="d-flex justify-content-end"><Button onClick={this.clickNewPost} className="platform-right-button" style={{ backgroundColor: "#9C9C9C" }}>New Post</Button></Row>

                </Col>
              </Row>


            </Container>




          </div>

          {/*       commenting out the placeholder rows              */}
          {/*
          <Container>
            <Row>

              <div class="platform-content-row" style={{ backgroundColor: this.state.PlatformColor2 }}>
                <Container>
                  <Row>
                    <Col xs lg="2" >
                      <Row>
                        Posted
                      </Row>
                      <Row>
                        10/19/2020:
                      </Row>
                    </Col>
                    <Col  >Did you know? Dale Earnhardt Jr was born on...</Col>
                  </Row>
                </Container>
              </div>
            </Row>


            <Row>
              <div class="platform-content-row" style={{ backgroundColor: this.state.PlatformColor2 }}>
                <Container>
                  <Row>
                    <Col xs lg="2" >
                      Quiz:
                    </Col>
                    <Col  > NASCAR History 101</Col>
                  </Row>
                </Container>
              </div>
            </Row>
            <Row>
            <div class="platform-content-row" style={{ backgroundColor: this.state.PlatformColor2 }}>
                <Container>
                  <Row>
                    <Col xs lg="2" >
                      New Subscriber:
                    </Col>
                    <Col  > MrMan97</Col>
                  </Row>
                </Container>
              </div>
            </Row>
            <Row>

            <div class="platform-content-row" style={{ backgroundColor: this.state.PlatformColor2 }}>
                <Container>
                  <Row>
                    <Col xs lg="2" >
                      <Row>
                        Posted
                      </Row>
                      <Row>
                        10/19/2020:
                      </Row>
                    </Col>
                    <Col  >Hello everyone! We will be releasing a new quiz...</Col>
                  </Row>
                </Container>
              </div>
            </Row>


            <Row>
            <div class="platform-content-row" style={{ backgroundColor: this.state.PlatformColor2 }}>
                <Container>
                  <Row>
                    <Col xs lg="2" >
                      New Subscriber:
                    </Col>
                    <Col  > Sp33dRacer3</Col>
                  </Row>
                </Container>
              </div>
            </Row>


          </Container>
          */}

          {/* quiz feed for platform in style of home feeds */}


          {this.state.platformFeed ?
            <div className="platformQuizFeed" >
              Quizes:{

                rendquizs
              }

              Posts:{

                rendposts
              }
            </div>

            : ""
          }


          {this.state.lederboardScreen ? <PlatformLeaderboardComponent ScoreBoard={this.state.ScoreBoard} /> : ""}
          {this.state.viewAllbadgeScreen ? <PlatformBadgeComponent /> : ""}
        </div>
      </div>

    );
  }
}
