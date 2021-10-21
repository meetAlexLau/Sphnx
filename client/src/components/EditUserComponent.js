import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class EditUserComponent extends Component{

    constructor(props){
        super(props)
    }

    render(){
        return(
            <Container fluid style={{ width: "100%" }}>
    <Row className="containerrow">
      <Col className="medium" md={6}>
        <Container className="light loginleft">
          <div
            style={{
              width: "311px",
              height: "76px",
              left: "54px",
              top: "87px",

              fontFamily: "Oxygen",
              fontStyle: "normal",
              fontWeight: "bold",
              fontSize: "60px",
              lineHeight: "76px",
              textAlign: "center"
            }}
          >
            Edit Profile
          </div>

          <div
            style={{
              width: "864px",
              height: "801px",

              background: "#E7C496",
              border: "solid",
              boxSizing: "border-box",
              borderRadius: "15px"
            }}
          >
            <Form>
              <Form.Group controlId="formUserName">
                <Form.Label
                  style={{
                    width: "218px",
                    height: "32px",
                    fontFamily: "Oxygen",
                    fontStyle: "normal",
                    fontWeight: "bold",
                    fontSize: "25px",
                    lineHeight: "32px"
                  }}
                >
                  Change Username
                </Form.Label>
                <Form.Control type="text" placeholder="ScaryJones23" />
              </Form.Group>

              <Form.Group controlId="formUserProfilePicture">
                <Form.Label
                  style={{
                    width: "314px",
                    height: "32px",
                    fontFamily: "Oxygen",
                    fontStyle: "normal",
                    fontWeight: "bold",
                    fontSize: "25px",
                    lineHeight: "32px"
                  }}
                >
                  Profile Picture
                </Form.Label>
                <Form.Control type="file" />
              </Form.Group>

              <Form.Group controlId="formUserBackgroundPicture">
                <Form.Label
                  style={{
                    width: "100%",
                    height: "32px",
                    fontFamily: "Oxygen",
                    fontStyle: "normal",
                    fontWeight: "bold",
                    fontSize: "25px",
                    lineHeight: "32px"
                  }}
                >
                  Profile Background Picture
                </Form.Label>
                <Form.Control type="file" />
              </Form.Group>

              <Form.Label
                style={{
                  width: "300px",
                  height: "32px",
                  fontFamily: "Oxygen",
                  fontStyle: "normal",
                  fontWeight: "bold",
                  fontSize: "25px",
                  lineHeight: "32px"
                }}
              >
                Primary Color
              </Form.Label>
              <Form.Control
                type="color"
                defaultValue="#FF5353"
                title="Choose your color"
              />

              <Form.Label
                style={{
                  width: "300px",
                  height: "32px",
                  fontFamily: "Oxygen",
                  fontStyle: "normal",
                  fontWeight: "bold",
                  fontSize: "25px",
                  lineHeight: "32px"
                }}
              >
                Secondary Color
              </Form.Label>
              <Form.Control
                type="color"
                defaultValue="#87CEEB"
                title="Choose your color"
              />

              <Link
                style={{position: 'absolute',
                        width: '164px',
                        height: '76px',
                        left: '431px',
                        top: '700px',
                        
                        background: '#FF6961',
                        border: 'solid',
                        borderColor: "black",
                        borderSize: '4px',
                        boxSizing: 'border-box',
                        borderRadius: '20px',
                  }}
                  to={'/profile'}>
                    Exit
              </Link>
              <Link 
                type='submit'
                style={{position: 'absolute',
                  width: '233px',
                  height: '76px',
                  left: '608px',
                  top: '700px',
                  
                  background: '#77DD77',
                  border: 'solid',
                  borderSize: '4px',
                  borderColor: 'black',
                  boxSizing: 'border-box',
                  borderRadius: '20px',
                }}
                to={'/profile'}>
                  Save & Exit
              </Link>

            </Form>
          </div>
        </Container>
      </Col>
      <Col className="dark" fluid md={6}>
        <div
          style={{
            background: "#FF5353",
            width: "1920px",
            height: "1080px"
          }}
        >
          <div
            style={{
              background: "gray",
              position: "absolute",
              width: "1361px",
              height: "610px",
              left: "279px",
              top: "8px",

              border: "solid",
              borderSize: "4px",
              borderRadius: "25px",
              boxSizing: "border-box"
            }}
          >
            <div
              style={{
                position: "absolute",
                width: "511px",
                height: "511px",
                left: "424px",
                top: "8px",

                backgroundPosition: "center",
                backgroundImage:
                  'url("https://images.freeimages.com/images/large-previews/25d/eagle-1523807.jpg")',
                border: "solid",
                boxSizing: "border-box",
                borderRadius: "50%"
              }}
            ></div>

            <div
              style={{
                position: "absolute",
                width: "288px",
                height: "68px",
                left: "534.5px",
                top: "531px",

                background: "#87CEEB",
                border: "solid",
                borderRadius: "15px"
              }}
            >
              <div
                style={{
                  position: "absolute",
                  width: "205px",
                  height: "41px",
                  left: "35px",
                  top: "5px",

                  fontFamily: "Oxygen",
                  fontStyle: "normal",
                  fontWeight: "normal",
                  fontSize: "40px",
                  lineHeight: "51px",
                  color: "#000000"
                }}
              >
                ScaryJones23
              </div>
            </div>
          </div>

          <div
            style={{
              position: "absolute",
              width: "843px",
              height: "478px",
              left: "78px",
              top: "634px",

              background: "#87CEEB",
              boxSizing: "border-box",
              borderRadius: "25px",
              border: "solid",
              borderSize: "4px"
            }}
          >
            <div
              style={{
                position: "absolute",
                width: "773px",
                height: "120px",
                left: "35px",
                top: "169px",

                background: "#FFA2A2",
                border: "solid",
                borderRadius: "15px"
              }}
            ></div>

            <div
              style={{
                position: "absolute",
                width: "773px",
                height: "120px",
                left: "35px",
                top: "321px",

                background: "#FFA2A2",
                border: "solid",
                borderRadius: "15px"
              }}
            ></div>

            <div
              style={{
                position: "absolute",
                width: "450px",
                height: "108px",
                left: "29px",
                top: "35px",

                background: "#FFA2A2",
                border: "solid",
                borderRadius: "15px"
              }}
            >
              <div
                style={{
                  position: "absolute",
                  width: "396px",
                  height: "76px",
                  left: "27px",
                  top: "16px",

                  fontFamily: "Oxygen",
                  fontStyle: "normal",
                  fontWeight: "normal",
                  fontSize: "60px",
                  lineHeight: "76px",
                  color: "#000000"
                }}
              >
                Your Platforms
              </div>
            </div>

            <div
              style={{
                position: "absolute",
                width: "259px",
                height: "108px",
                left: "529px",
                top: "35px",

                background: "#FFA2A2",
                border: "solid",
                borderRadius: "15px"
              }}
            >
              <div
                style={{
                  position: "absolute",
                  width: "244px",
                  height: "115px",
                  left: "8px",
                  top: "12px",

                  fontFamily: "Oxygen",
                  fontStyle: "normal",
                  fontWeight: "normal",
                  fontSize: "35px",
                  lineHeight: "44px",
                  color: "#000000",
                  textAlign: "center"
                }}
              >
                Create New Platform
              </div>
            </div>
          </div>

          <div
            style={{
              position: "absolute",
              width: "843px",
              height: "478px",
              left: "1000px",
              top: "634px",

              background: "#87CEEB",
              boxSizing: "border-box",
              borderRadius: "25px",
              border: "solid",
              borderSize: "4px"
            }}
          >
            <div
              style={{
                position: "absolute",
                width: "773px",
                height: "120px",
                left: "35px",
                top: "169px",

                background: "#FFA2A2",
                border: "solid",
                borderRadius: "15px"
              }}
            ></div>

            <div
              style={{
                position: "absolute",
                width: "773px",
                height: "120px",
                left: "35px",
                top: "321px",

                background: "#FFA2A2",
                border: "solid",
                borderRadius: "15px"
              }}
            ></div>

            <div
              style={{
                position: "absolute",
                width: "725px",
                height: "92px",
                left: "55px",
                top: "34px",

                background: "#FFA2A2",
                border: "solid",
                borderRadius: "15px"
              }}
            >
              <div
                style={{
                  position: "absolute",
                  width: "235px",
                  height: "76px",
                  left: "245px",
                  top: "3px",

                  fontFamily: "Oxygen",
                  fontStyle: "normal",
                  fontWeight: "normal",
                  fontSize: "60px",
                  lineHeight: "76px",
                  textAlign: "center",
                  color: "#000000"
                }}
              >
                Recently
              </div>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  </Container>
        )

    }
}