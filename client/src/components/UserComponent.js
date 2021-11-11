import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from 'react-bootstrap/Form';
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
            UserPoints: 0,
            UserPlatformArray: []
        }

        this.onClickNewPlatform = this.onClickNewPlatform.bind(this)
        this.onClickPlatform = this.onClickPlatform.bind(this)
        this.onClickMyBadge = this.onClickMyBadge.bind(this)
        this.onClickQuiz = this.onClickQuiz.bind(this)
        this.renderPlatforms = this.renderPlatforms.bind(this)
    }

    componentDidMount(){
        if(this.state.isLoggedIn !== "true"){
            this.props.history.push('/')
        }
        else{
            
            axios.get('http://localhost:4000/users/UserID/' + sessionStorage.getItem('UserID'))
                .then(res => {
                    console.log(res);
                    let User = res.data[0];
                    this.setState({
                        UserName : User.UserName,
                        UserPicture : User.UserPicture,
                        UserPrimaryColor : User.UserPrimaryColor,
                        UserSecondaryColor : User.UserSecondaryColor,
                        UserBackgroundPicture : User.UserBackgroundPicture,
                        UserPoints : User.UserPoints,
                        UserPlatformArray: User.UserPlatformArray
                    }) 
                    this.renderPlatforms();
                })
        }
    }

    onClickNewPlatform(){
      this.props.history.push('/newPlatform')
    }

    onClickPlatform(PlatformID){
        sessionStorage.setItem('current platform', PlatformID);
        sessionStorage.setItem('previous platform', PlatformID);
        this.props.history.push('/platform/' + PlatformID);
    }

    onClickMyBadge(){
      this.props.history.push('/myBadge')
    }

    onClickQuiz(){
      this.props.history.push('/quiz')
    }

    renderPlatforms(){
        let p: [number, string] = [];
        let promises = [];
        
        for(let i =0; i < this.state.UserPlatformArray.length; i++){
            let platID = this.state.UserPlatformArray[i];
            promises.push(
                axios.get('http://localhost:4000/platforms/' + platID)
                    .then(res => {
                        let object = res.data;
                        p.push([object.PlatformID, object.PlatformName]);
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            )
        }
        Promise.all(promises).then(() => {
            this.setState({
                UserPlatformArray: p
            })
        });
    }
    
    render(){
        //<Button onClick={this.onClickPlatform}  className="profileCard" style={{background: this.state.UserPrimaryColor}}>Cowboys</Button>
        //<Button onClick={this.onClickPlatform} className="profileCard" style={{background: this.state.UserPrimaryColor}}>Instruments</Button>
        let plats = this.state.UserPlatformArray?.map((plat, i) => {
            return(
            <Button key={i} 
                    onClick={() => this.onClickPlatform(plat[0])} 
                    className="profileCard" 
                    style={{background: this.state.UserPrimaryColor}}
                    >
                    {plat[1]}
            </Button>
            )
        })
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
                        {plats}
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
