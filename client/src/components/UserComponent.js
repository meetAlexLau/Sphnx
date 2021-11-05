import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from 'axios'


import '../css/userComponent.css'

export default class UserComponent extends Component{

    constructor(props){

        super(props)

        this.state = {
            isLoggedIn: sessionStorage.getItem('isLoggedIn'),
            UserPrimaryColor: '',
            UserSecondaryColor: '',
            UserName: '',
            UserPicture: "",
            UserBackgroundPicture: '',
            UserPoints: 0
        }

        this.onClickNewPlatform = this.onClickNewPlatform.bind(this)
        this.onClickPlatform = this.onClickPlatform.bind(this)
        this.onClickMyBadge = this.onClickMyBadge.bind(this)
        this.onClickQuiz = this.onClickQuiz.bind(this)

    }

    componentDidMount(){
        if(this.state.isLoggedIn !== "true"){
            this.props.history.push('/')
        }
            else{
                axios.get('/users/UserID/' + sessionStorage.getItem('UserID'))
                    .then(res => {
                        let User = res.data[0];
                        this.setState({
                            UserName : User.UserName,
                            UserPicture : User.UserPicture,
                            UserPrimaryColor : User.UserPrimaryColor,
                            UserSecondaryColor : User.UserSecondaryColor,
                            UserBackgroundPicture : User.UserBackgroundPicture,
                            UserPoints : User.UserPoints
                        }) 
                        console.log(this.state);
                    })
            }
    }

    onClickNewPlatform(){
      this.props.history.push('/newPlatform')
    }

    onClickPlatform(){
      this.props.history.push('/platform')
    }

    onClickMyBadge(){
      this.props.history.push('/myBadge')
    }

    onClickQuiz(){
      this.props.history.push('/quiz')
    }

    
    render(){

        return(
          <Container fluid style={{ background: this.state.UserPrimaryColor }}>
            <Row>
            <Col md={12}>
                <Row>
                <Col md={1}>
                    <Link to="/home" class="homeButton">
                    Return Home
                    </Link>
                </Col>
                <Col
                    md={10}
                    className="profileBackgroundBlock"
                    style={{backgroundImage: this.state.UserBackgroundPicture}}
                >
                    <Row>
                    <Col md={1}>
                        <Image
                        src="https://www.pngmart.com/files/14/Golden-Ribbon-Badge-PNG.png"
                        fluid
                        />
                        <Image
                        src="https://www.pngmart.com/files/14/Golden-Ribbon-Badge-PNG.png"
                        fluid
                        />
                        <Image
                        src="https://www.pngmart.com/files/14/Golden-Ribbon-Badge-PNG.png"
                        fluid
                        />
                    </Col>
                    <Col md={10}>
                        <Image
                        className="rounded-circle"
                        style={{ margin: "auto", width: "33%", display: "block" }}
                        src={this.state.UserPicture}
                        />
                        <div className="profileNameTag"
                            style={{background: this.state.UserSecondaryColor}}>{this.state.UserName}</div>
                        <div className="profileNameTag"
                            style={{background: this.state.UserSecondaryColor}}>Total Points: {""+this.state.UserPoints}</div>
                    </Col>
                    <Col md={1}>
                        <Image
                        src="https://www.pngmart.com/files/14/Golden-Ribbon-Badge-PNG.png"
                        fluid
                        />
                        <Image
                        src="https://www.pngmart.com/files/14/Golden-Ribbon-Badge-PNG.png"
                        fluid
                        />
                        <Image
                        src="https://www.pngmart.com/files/14/Golden-Ribbon-Badge-PNG.png"
                        fluid
                        />
                    </Col>
                    </Row>
                </Col>
                <Col md={1}>
                    <Button onClick={this.onClickMyBadge} className="profilePageButton" style={{background: this.state.UserPrimaryColor}}>View All Badges</Button>
                    <Link to="/profile/edit" className="profilePageButton" style={{background: this.state.UserPrimaryColor}}>Edit Profile </Link>
                </Col>
                </Row>
            </Col>
            </Row>
            <Row className="profileBlockBase">
            <Col md={6}>
                <div className="profileBlock"
                style={{background: this.state.UserSecondaryColor}}>
                <Row>
                    <Col md={8}>
                    <div className="profileCard" style={{background: this.state.UserPrimaryColor}}>My Platforms</div>
                    </Col>
                    <Col md={4}>
                    <Button onClick={this.onClickNewPlatform} className="profileCard" style={{background: this.state.UserPrimaryColor}}> New Platform </Button>
                    </Col>
                </Row>
                <Row style={{ margin: "8px" }}>
                    <Col md={12} style={{ margin: "5px 2px" }}>
                    <Button onClick={this.onClickPlatform}  className="profileCard" style={{background: this.state.UserPrimaryColor}}>Cowboys</Button>
                    <Button onClick={this.onClickPlatform} className="profileCard" style={{background: this.state.UserPrimaryColor}}>Instruments</Button>
                    </Col>
                </Row>
                </div>
            </Col>
            <Col md={6}>
                <div className="profileBlock"
                style={{background: this.state.UserSecondaryColor}}>
                <Row>
                    <Col md={12} style={{ margin: "5px 2px" }}>
                    <div className="profileCard" style={{background: this.state.UserPrimaryColor}}> Recently </div>
                    <div className="profileCard" style={{background: this.state.UserPrimaryColor}}> Quiz: Racecar Facts</div>
                    <Button className="profileCard" onClick={this.onClickPlatform}  style={{background: this.state.UserPrimaryColor}}> Platform: Movies</Button>
                    </Col>
                </Row>
                </div>
            </Col>
            </Row>
      </Container>
      )
    }


}
