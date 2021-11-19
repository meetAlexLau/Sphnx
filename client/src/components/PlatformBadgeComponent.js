import React, { Component } from "react";

import { Link } from 'react-router-dom';

import { Form, Col, Row, Container, Button } from "react-bootstrap";
import axios from "axios";
import Card from 'react-bootstrap/Card';
import '../css/PlatBadges.css';
//import axios from 'axios';



export default class PlatformBadge extends Component {

  constructor(props) {
    super(props)

    this.state = {
      Badges: [],
    }
  }

  componentDidMount(){
    //console.log(this.props.PlatformBadgeArray);
    this.getBadges();
  }

  getBadges = async () => {
    let b = [];
    console.log(this.props.PlatformBadgeArray);

    //iterate through badges
    for (let i = 0; i < this.props.PlatformBadgeArray.length; i++) {
      try {
        await axios.get('http://localhost:4000/badges/' + this.props.PlatformBadgeArray[i])
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
    console.log(this.state.Badges);
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

      <Container>
        <div className="PlatformBadgesFeed">
          {
            rendbadges
          }
        </div>
      </Container>

    );
  }
}
