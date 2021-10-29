import React, { Component } from "react";

import { Link } from 'react-router-dom';

import { Form, Col, Row, Container, Button } from "react-bootstrap";
//import axios from 'axios';



export default class PlatformLeaderboard extends Component {

  constructor(props) {
    super(props)

  }

  render() {
    return (


      <div class="platform-backgorund" style={{ backgroundImage: `url("https://s3-alpha-sig.figma.com/img/00af/4155/29de19f4df8c2a4e41bb723fd95362e2?Expires=1635724800&Signature=PVA11EFkHmq5xt7imvZ89GSsvZWKadADlM0dqBwbYrXAd2UNVK0fssovN~EqEl0efWVO7s7ZPLhU5gEThaEZkWcCEvQ8SPWJ~EtEfErJAuZrxYZIMElKKdo4qq7~sys5s4CEbV1G-lR3Af2QBqz3vgMKUz2zaKZB3vQCE5VYtEVCtViB3J500MXdymu9Xj386~TrqvAXtNcEuWr5UD2nkwVjQjk9EWhNJ-zDOo1SxE71te15fXpJOda7GrFQAm8OAV0rbyRtAuzuXNnJC1GyULEaVJ5FYYZt4np~2jRXuP5HgDgoi1riOPDJG08IwUozIkiQ7WoCMXPilMEF6z5V3g__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA")` }} >



        <div class="platform-content">
          <div class="platform-content-header">

          <Container>
              <Row>
                <Col>
                  <Row><Link to={"/platformLeaderboard"} className="platform-left-button">Leaderboard</Link>
                    <Link to={"/home"} className="platform-home-button"></Link>
                  </Row>
                  <Row><Link to={"/platformBadge"} className="platform-left-button">View All Badges</Link>
                  <Link to={"/platform"} className="platform-left-button">Platform Home</Link>
                  </Row>
                </Col>

                <Col>
                  <Row className="d-flex justify-content-center" style={{ fontSize: "20px" }}>Platform</Row>
                  <Row className="d-flex justify-content-center" style={{ fontSize: "40px" }}>Racecar Fans</Row>
                </Col>

                <Col >

                  <Row className="d-flex justify-content-end"><Link to={"/"} className="platform-right-button" style={{ backgroundColor: "#E79696" }}>unsubscribe</Link></Row>
                  <Row className="d-flex justify-content-end"><Link to={"/newQuiz"} className="platform-right-button" style={{ backgroundColor: "#9C9C9C" }}>New Quiz</Link></Row>
                  <Row className="d-flex justify-content-end"><Link to={"/newPost"} className="platform-right-button" style={{ backgroundColor: "#9C9C9C" }}>New Post</Link></Row>

                </Col>
              </Row>


            </Container>




          </div>

          <Container>
            <Row>
              <div class="platform-content-row" style={{ backgroundColor: "#D4AF37" }}>
                <Container>
                  <Row>
                    <Col xs lg="2" >
                      1.
                    </Col>
                    <Col  >
                      FerrariFan1967
                    </Col>
                  </Row>
                </Container>
              </div>
            </Row>
            <Row>
              <div class="platform-content-row" style={{ backgroundColor: "#A8A9AD" }}>
                <Container>
                  <Row>
                    <Col xs lg="2" >
                      2.
                    </Col>
                    <Col  >
                      JohnCena
                    </Col>
                  </Row>
                </Container>
              </div>
            </Row>
            <Row>
              <div class="platform-content-row" style={{ backgroundColor: "#A97142" }}>
                <Container>
                  <Row>
                    <Col xs lg="2" >
                      3.
                    </Col>
                    <Col  >
                      Ninja
                    </Col>
                  </Row>
                </Container>
              </div>
            </Row>
            <Row>
              <div class="platform-content-row">
                <Container>
                  <Row>
                    <Col xs lg="2" >
                      4.
                    </Col>
                    <Col  >
                      DwayneNotTheRockJohnson
                    </Col>
                  </Row>
                </Container>
              </div>
            </Row>
            <Row>
              <div class="platform-content-row">
                <Container>
                  <Row>
                    <Col xs lg="2" >
                      5.
                    </Col>
                    <Col  >
                      jack
                    </Col>
                  </Row>
                </Container>
              </div>
            </Row>





          </Container>







        </div>
      </div>

    );
  }
}
