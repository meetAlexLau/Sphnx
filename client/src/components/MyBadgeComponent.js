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
    await axios.get('http://localhost:4000/users/UserID/' + sessionStorage.getItem('UserID'))
      .then(res => {
        user = res.data[0];
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
            <Link to={"/profile"} className="badge-button">
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
          {/*
          <Container>
            <Row>
              <Col>
                <Row className="d-flex justify-content-center"><img style={{ "witdth": "100px", "height": "100px" }} src="https://www.pngmart.com/files/14/Golden-Ribbon-Badge-PNG.png" />
                </Row>
                <Row className="d-flex justify-content-center" >Speed Demon</Row>
              </Col>

              <Col>
                <Row className="d-flex justify-content-center"><img style={{ "witdth": "100px", "height": "100px" }} src="https://www.pngmart.com/files/14/Golden-Ribbon-Badge-PNG.png" />
                </Row>
                <Row className="d-flex justify-content-center">Hat Trick</Row>
              </Col>

              <Col>

                <Row className="d-flex justify-content-center"><img style={{ "witdth": "100px", "height": "100px" }} src="https://www.pngmart.com/files/14/Golden-Ribbon-Badge-PNG.png" />
                </Row>
                <Row className="d-flex justify-content-center">Biggest Loser</Row>
              </Col>
            </Row>
            <Row>
            <Col>
                <Row className="d-flex justify-content-center"><img style={{ "witdth": "100px", "height": "100px" }} src="https://www.pngmart.com/files/14/Golden-Ribbon-Badge-PNG.png" />
                </Row>
                <Row className="d-flex justify-content-center">Ancient Member</Row>
              </Col>

              <Col>
                <Row className="d-flex justify-content-center"><img style={{ "witdth": "100px", "height": "100px" }} src="https://www.pngmart.com/files/14/Golden-Ribbon-Badge-PNG.png" />
                </Row>
                <Row className="d-flex justify-content-center">Beginner’s Luck</Row>
              </Col>

              <Col>

                <Row className="d-flex justify-content-center"><img style={{ "witdth": "100px", "height": "100px" }} src="https://www.pngmart.com/files/14/Golden-Ribbon-Badge-PNG.png" />
                </Row>
                <Row className="d-flex justify-content-center">Top Player</Row>
              </Col>
            </Row>
          </Container>
*/}


        </div>
      </div>

    );
  }
}
