import React, { Component } from "react";

import { Link } from 'react-router-dom';

import { Form, Col, Row, Container, Button } from "react-bootstrap";
//import axios from 'axios';



export default class PlatformBadge extends Component {

  constructor(props) {
    super(props)

  }

  render() {
    return (




       
          
          <Container>
            <Row>

              <div class="platform-content-row">
                <Container>
                  <Row>
                    <Col xs lg="2" >
                      <img style={{ "witdth": "70px", "height": "70px" }} src="https://www.pngmart.com/files/14/Golden-Ribbon-Badge-PNG.png" />
                    </Col>
                    <Col  >
                      <Row style={{ fontSize: "30px" }} >
                        Speed Demon
                      </Row>
                      <Row>
                        Complete a Quiz in less than 180 Seconds.
                      </Row>
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
                      <img style={{ "witdth": "70px", "height": "70px" }} src="https://www.pngmart.com/files/14/Golden-Ribbon-Badge-PNG.png" />
                    </Col>
                    <Col  >
                      <Row style={{ fontSize: "30px" }} >
                        Gran Turismo
                      </Row>
                      <Row>
                        Score above 80% correct answers on “GT Cars of Italy”.
                      </Row>
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
                      <img style={{ "witdth": "70px", "height": "70px" }} src="https://www.pngmart.com/files/14/Golden-Ribbon-Badge-PNG.png" />
                    </Col>
                    <Col  >
                      <Row style={{ fontSize: "30px" }} >
                        Top Player
                      </Row>
                      <Row>
                        Reach #1 on the leaderboard.
                      </Row>
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
                      <img style={{ "witdth": "70px", "height": "70px" }} src="https://www.pngmart.com/files/14/Golden-Ribbon-Badge-PNG.png" />
                    </Col>
                    <Col  >
                      <Row style={{ fontSize: "30px" }} >
                        F1 Superstar
                      </Row>
                      <Row>
                        Get a perfect score on “Iconic F1 Races”.
                      </Row>
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
                      <img style={{ "witdth": "70px", "height": "70px" }} src="https://www.pngmart.com/files/14/Golden-Ribbon-Badge-PNG.png" />
                    </Col>
                    <Col  >
                      <Row style={{ fontSize: "30px" }} >
                        Need for Speed
                      </Row>
                      <Row>
                        Complete “Fastest Cars in the United States” in less than 120 Seconds.
                      </Row>
                    </Col>
                  </Row>
                </Container>
              </div>
            </Row>

          </Container>


        
      

    );
  }
}
