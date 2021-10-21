import React, { Component } from "react";

import { Link } from 'react-router-dom';

import { Form, Col, Row, Container, Button } from "react-bootstrap";
import axios from 'axios';
import { SketchPicker } from 'react-color';


export default class MyBadge extends Component {

  constructor(props) {
    super(props)

  }

  render() {
    return (


      <div class="backgorund"  >
        <div class="badge-content">
          <div class="badge-content-header">
            <Link to={"/userComponent"} className="badge-button">
              Back
            </Link>
            My badges
          </div>


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
                <Row className="d-flex justify-content-center">Hat Trickr</Row>
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







        </div>
      </div>

    );
  }
}
