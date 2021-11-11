import React, { Component } from "react";

import { Link } from 'react-router-dom';

import { Form, Col, Row, Container, Button } from "react-bootstrap";
import axios from 'axios';
import Card from 'react-bootstrap/Card';

import PlatformLeaderboardComponent from "./PlatformLeaderboardComponent";


export default class Platform extends Component {

  constructor(props) {
    super(props)

    this.state = {
      isLoggedIn: sessionStorage.getItem('isLoggedIn'),
      PlatformColor1: '#',
      PlatformColor2: '#',
      PlatformName: ' Fans',
      PlatformDesc: '',
      //PlatformPicture: `url("https://s3-alpha-sig.figma.com/img/00af/4155/29de19f4df8c2a4e41bb723fd95362e2?Expires=1635724800&Signature=PVA11EFkHmq5xt7imvZ89GSsvZWKadADlM0dqBwbYrXAd2UNVK0fssovN~EqEl0efWVO7s7ZPLhU5gEThaEZkWcCEvQ8SPWJ~EtEfErJAuZrxYZIMElKKdo4qq7~sys5s4CEbV1G-lR3Af2QBqz3vgMKUz2zaKZB3vQCE5VYtEVCtViB3J500MXdymu9Xj386~TrqvAXtNcEuWr5UD2nkwVjQjk9EWhNJ-zDOo1SxE71te15fXpJOda7GrFQAm8OAV0rbyRtAuzuXNnJC1GyULEaVJ5FYYZt4np~2jRXuP5HgDgoi1riOPDJG08IwUozIkiQ7WoCMXPilMEF6z5V3g__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA")`
      PlatformPicture: '',
      //PlatformPicture: `url(https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8&w=1000&q=80)`
      Quizzes: [],
      ScoreBoard: [],
      platformFeed: 1,
      lederboardScreen: 0,
      viewAllbadgeScreen: 0

    }

  }
  componentWillUnmount() {
    sessionStorage.removeItem('current platform')
  }
  componentDidMount() {
    // Persistent Platform when using <back or forward> buttons
    let currentPlatform = sessionStorage.getItem('current platform');
    let PlatformID = currentPlatform ? currentPlatform : sessionStorage.getItem('previous platform')
    sessionStorage.setItem('current platform', sessionStorage.getItem('previous platform'))
    //
    if (this.state.isLoggedIn !== "true") {
      this.props.history.push('/')
    }
    else {
      axios.get('http://localhost:4000/platforms/' + PlatformID)
        .then(res => {
          console.log(sessionStorage.getItem('current platform'));
          console.log('logging res', res);
          this.setState({
            PlatformName: res.data.PlatformName,
            PlatformPicture: res.data.PlatformPicture,
            PlatformColor1: res.data.PlatformColor1,
            PlatformColor2: res.data.PlatformColor2,
            PlatformDesc: res.data.PlatformDesc,
            ScoreBoard: res.data.ScoreBoard,
          })
        })
      this.getQuizzes(PlatformID);
    }
  }

  routeChangeQuiz = (QuizID) => {
    sessionStorage.setItem('current quiz', QuizID);
    sessionStorage.setItem('previous quiz', QuizID);
    this.props.history.push('/quiz/' + QuizID);
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
    console.log(this.state.Quizzes);
  }

  // Racecar Background
  // `url("https://s3-alpha-sig.figma.com/img/00af/4155/29de19f4df8c2a4e41bb723fd95362e2?Expires=1635724800&Signature=PVA11EFkHmq5xt7imvZ89GSsvZWKadADlM0dqBwbYrXAd2UNVK0fssovN~EqEl0efWVO7s7ZPLhU5gEThaEZkWcCEvQ8SPWJ~EtEfErJAuZrxYZIMElKKdo4qq7~sys5s4CEbV1G-lR3Af2QBqz3vgMKUz2zaKZB3vQCE5VYtEVCtViB3J500MXdymu9Xj386~TrqvAXtNcEuWr5UD2nkwVjQjk9EWhNJ-zDOo1SxE71te15fXpJOda7GrFQAm8OAV0rbyRtAuzuXNnJC1GyULEaVJ5FYYZt4np~2jRXuP5HgDgoi1riOPDJG08IwUozIkiQ7WoCMXPilMEF6z5V3g__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA")`


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


  render() {
    console.log(this.state)

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
    console.log(quizs);
    let rendquizs = [];
    while (quizs.length > 0) {        //splice the array of platforms into groups of 4
      let chunk = quizs.splice(0, 4);
      rendquizs.push(chunk)
    }
    console.log(rendquizs)
    for (var j = 0; j < rendquizs.length; j++) {          //each chunk is a group of 4, surround with <Row>
      rendquizs[j] = <Row> {rendquizs[j]} </Row>
    }

    return (


      <div class="platform-background" style={{ backgroundImage: 'url(' + this.state.PlatformPicture + ')' }} >



        <div class="platform-content" style={{ backgroundColor: this.state.PlatformColor1 }}>
          <div class="platform-content-header" style={{ backgroundColor: this.state.PlatformColor2 }}>

            <Container>
              <Row>
                <Col>
                  <Row>
                    <button className="platform-left-button" onClick={() => this.onClickLeaderboard()}>
                      Leaderboard
                    </button>


                    <Link to={"/home"} className="platform-home-button"></Link>
                  </Row>
                  <Row><Link to={"/platformBadge"} className="platform-left-button">View All Badges</Link>

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

                  <Row className="d-flex justify-content-end"><Link to={"/"} className="platform-right-button" style={{ backgroundColor: "#E79696" }}>unsubscribe</Link></Row>
                  <Row className="d-flex justify-content-end"><Link to={"/newQuiz"} className="platform-right-button" style={{ backgroundColor: "#9C9C9C" }}>New Quiz</Link></Row>
                  <Row className="d-flex justify-content-end"><Link to={"/newPost"} className="platform-right-button" style={{ backgroundColor: "#9C9C9C" }}>New Post</Link></Row>

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


          {this.state.platformFeed &&
            <div className="platformQuizFeed" >{
                rendquizs
              }
            </div>
          }

          {this.state.lederboardScreen && <PlatformLeaderboardComponent ScoreBoard={this.state.ScoreBoard} />}

        </div>
      </div>

    );
  }
}
