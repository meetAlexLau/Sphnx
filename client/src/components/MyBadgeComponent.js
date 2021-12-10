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
      Badges: [],
    }
  }

  componentDidMount() {
    this.getBadges();
  }

  getBadges = async () => {
    let b = [];
    let user;

    // get userbadgearray from this user
    console.log(this.props.match.params.id);
    await axios.get('http://localhost:4000/users/' + this.props.match.params.id)
      .then(res => {
        user = res.data;
      })

    // iterate through and get all badges
    for (let i = 0; i < user.UserBadgeArray.length; i++) {
      try {
        await axios.get('http://localhost:4000/badges/' + user.UserBadgeArray[i])
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
  }

  render() {

    let badges = this.state.Badges?.map((badge, i) => (
      <Col key={i}>
        <Card className='activityCard'>
          <Card.Img variant='top' className='activityCardImage' src={badge.BadgePicture}></Card.Img>
            {badge.BadgeTitle}
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

      <div class="background"  >
        <div class="badge-content">
          <div class="badge-content-header">
            <Link to={{pathname:'/profile/' + this.props.match.params.id, state:{isLoggedIn:true}}} className="badge-button">
              Back
            </Link>
            My badges

            {/* Dynamically populate with this user's earned badges */}
            <div className="myBadgesFeed" >
              {
                rendbadges
              }
            </div>

          </div>

          {/* commenting out placeholder */}
        </div>
      </div>

    );
  }
}
