import React, { Component } from "react";

import { Link } from 'react-router-dom';

import { Form, Col, Row, Container, Button } from "react-bootstrap";
import axios from "axios";
import Card from 'react-bootstrap/Card';
import '../css/UserBadgesFeed.css';
//import axios from 'axios';
//import { SketchPicker } from 'react-color';


export default class MyBadge extends Component {

  constructor(props) {
    super(props)

    this.state = {
      isLoggedIn: sessionStorage.getItem('isLoggedIn'),
      Badges: [],
      BadgePlatformNames: [],
      BadgeQuizNames: []
    }
  }

  componentDidMount() {
    if (this.state.isLoggedIn == "false" || this.state.isLoggedIn == undefined) {
      this.props.history.push('/')
    }
    this.getBadges(this.getPlatformNames, this.getQuizNames);
  }

  getBadges = async (callbackOne, callbackTwo) => {
    let b = [];
    let user;

    // get userbadgearray from this user
    
    await axios.get('/users/' + this.props.match.params.id)
      .then(res => {
        user = res.data;
      })

    // iterate through and get all badges
    for (let i = 0; i < user.UserBadgeArray.length; i++) {
      try {
        await axios.get('/badges/' + user.UserBadgeArray[i])
          .then(res => {
            b.push(res.data);
            this.setState({
              Badges: this.state.Badges.concat([b[i]])
            })
          })
      } catch (err) {
        console.log(err);
      }
    }
    //console.log(this.state.Badges);
    callbackOne();
    callbackTwo();
  }

  getPlatformNames = async () => {
    let n = [];
    let plat;

    // iterate through badges and get their platforms
    for (let i = 0; i < this.state.Badges.length; i++){
      try {
        await axios.get('/platforms/' + this.state.Badges[i].BadgeHostPlatform)
          .then(res => {
            plat = res.data;
            n.push(plat.PlatformName);
            this.setState({
              BadgePlatformNames: this.state.BadgePlatformNames.concat([n[i]])
            })
          })
      } catch (err) {
        console.log(err);
      }
    }

    console.log(this.state.BadgePlatformNames)
  }

  getQuizNames = async () => {
    let n = [];
    let quiz;

    // iterate through badges and get their quiz
    for (let i =0; i < this.state.Badges.length; i++){
      try {
        await axios.get('/quizzes/' + this.state.Badges[i].BadgeHostQuiz)
          .then(res => {
            quiz = res.data;
            n.push(quiz.QuizTitle);
            this.setState({
              BadgeQuizNames: this.state.BadgeQuizNames.concat([n[i]])
            })
          })
      } catch (err) {
        console.log(err);
      }
    }

    console.log(this.state.BadgeQuizNames)
  }

  render() {

    let badges = this.state.Badges?.map((badge, i) => (
      <Col key={i} >
        <Card className='activityCardBadge' >
          <Card.Img variant='top' className='activityCardImage' src={badge.BadgePicture}></Card.Img>
          {/* Badge Title */}
          <div className='badgeTitle'>{badge.BadgeTitle}</div>

          {/* Badge Quiz */}
          <div className='badgeDescription'>From "{this.state.BadgeQuizNames[i]}" Quiz </div>

          {/* Badge Platform */}
          <div className='badgeDescription'>on "{this.state.BadgePlatformNames[i]}" platform.</div>

          {/* Badge Earning Conditions */}
          <div>
            {(() => {
              if (badge.BadgeType == 3) {
                return (
                  <div className='badgeDescription'>Condition: Earn a perfect score. </div>
                )
              } else if (badge.BadgeType == 2) {
                return (
                  <div className='badgeDescription'>Condition:  Complete within {badge.BadgeMaxTime} seconds. </div>
                )
              } else {
                return (
                  <div className='badgeDescription'>Condition:  Earn at least {badge.BadgeMinScore} points.</div>
                )
              }
            })()}
          </div>
        </Card>
      </Col>
    ))

    let rendbadges = [];
    while (badges.length > 0) {
      let chunk = badges.splice(0, 3);
      rendbadges.push(chunk)
    }

    for (var j = 0; j < rendbadges.length; j++) {
      rendbadges[j] = <Row> {rendbadges[j]} </Row>
    }

    return (

      <Container fluid className=" badge-background">
        <Container className="badge-content">
          <div class="badge-content-header">
            <Link to={{ pathname: '/profile/' + this.props.match.params.id, state: { isLoggedIn: true } }} className="badge-button">
              Back
            </Link>
            My badges
            </div>

            {/* Dynamically populate with this user's earned badges */}
            <div className="myBadgesFeed" >
              {
                rendbadges
              }
            </div>

          
          {/* commenting out placeholder */}
        
        </Container>
      </Container>

    );
  }
}
