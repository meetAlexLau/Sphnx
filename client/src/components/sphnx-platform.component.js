import React, { Component } from "react";

import { Link } from 'react-router-dom';

import { Form, Col, Row, Container, Button } from "react-bootstrap";
import axios from 'axios';
import { SketchPicker } from 'react-color';


export default class Platform extends Component {

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
                  <Row><Link to={"/student-list"} className="platform-left-button">Leaderboard</Link>
                    <Link to={"/student-list"} className="platform-home-button"></Link>
                  </Row>
                  <Row><Link to={"/student-list"} className="platform-left-button">View All Badges</Link>

                  </Row>
                </Col>

                <Col>
                  <Row className="d-flex justify-content-center" style={{ fontSize: "20px" }}>Platform</Row>
                  <Row className="d-flex justify-content-center" style={{ fontSize: "40px" }}>Racecar Fans</Row>
                </Col>

                <Col >

                  <Row className="d-flex justify-content-end"><Link to={"/student-list"} className="platform-right-button" style={{ backgroundColor: "#E79696" }}>unsubscribe</Link></Row>
                  <Row className="d-flex justify-content-end"><Link to={"/student-list"} className="platform-right-button" style={{ backgroundColor: "#9C9C9C" }}>New Quiz</Link></Row>
                  <Row className="d-flex justify-content-end"><Link to={"/student-list"} className="platform-right-button" style={{ backgroundColor: "#9C9C9C" }}>New Post</Link></Row>

                </Col>
              </Row>


            </Container>




          </div>

          <Container>
            <Row>

              <div class="platform-content-row">
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
              <div class="platform-content-row">
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
              <div class="platform-content-row">
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

              <div class="platform-content-row">
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
              <div class="platform-content-row">
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







        </div>
      </div>

    );
  }
}
