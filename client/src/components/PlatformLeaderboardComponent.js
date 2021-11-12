import React, { Component } from "react";

import { Link } from 'react-router-dom';

import { Form, Col, Row, Container, Button } from "react-bootstrap";
//import axios from 'axios';



export default class PlatformLeaderboard extends Component {

  constructor(props) {
    super(props)
    //this.comparePoints = this.comparePoints.bind(this);
  }

  /*
  comparePoints(a, b) {
    return a.point - b.point;
  }*/


  render() {
    let sortedByPointArray=this.props.ScoreBoard
    
    //sortedByPointArray.sort(comparePoints)
    sortedByPointArray.sort((a, b) => (a.point > b.point) ? -1 : 1)
    return (


      <Container>
        {/*
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
            */}

        {
          (sortedByPointArray ? sortedByPointArray : []).map((input, index) => {
            
              let color="#000000"
            
            if(index==0){
               color="#D4AF37"
            }else if(index==1){
               color="#A8A9AD"
            }else if(index==2){
               color="#A97142"
            }

            return (
               
              <Row>
                <div class="platform-content-row" style={{ backgroundColor: color }}>
                  <Container>
                    <Row>
                      <Col xs lg="2" >
                        {index+1}.
                      </Col>
                      <Col  >
                        {input.userName}
                      </Col>
                      <Col  >
                        {input.point}
                      </Col>
                    </Row>
                  </Container>
                </div>
              </Row>
            )
          })
        }


      </Container>


    );
  }
}
